let playingSounds = [];
function stopAllSounds() {
    playingSounds.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    playingSounds = [];
}
function playCharacterSound(soundPath) {
    if (!soundPath) return;
    const audio = new Audio(soundPath);
    audio.volume = 0.3;
    audio.play().catch(() => {});
    playingSounds.push(audio);
    audio.addEventListener('ended', () => {
        const idx = playingSounds.indexOf(audio);
        if (idx !== -1) playingSounds.splice(idx, 1);
    });
}
function renderCard(character, container) {
    const card = document.createElement('div');
    card.className = 'gacha-card';
    card.dataset.rarity = character.rarity;
    let avatarHtml;
    if (character.avatar) {
        avatarHtml = `<img src="${character.avatar}" alt="${character.name}" style="width:60px;height:60px;border-radius:50%;object-fit:cover;margin-bottom:4px;border:2px solid rgba(255,255,255,0.3);">`;
    } else {
        const initial = character.name.charAt(0) || '?';
        avatarHtml = `<div style="width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:bold;color:white;margin:0 auto 4px auto;">${initial}</div>`;
    }

    card.innerHTML = `
        <div class="gacha-card-inner">
            <div class="gacha-card-front">
                ${avatarHtml}
                <div class="card-name">${character.name}</div>
                <div class="card-rarity">${character.rarity}</div>
            </div>
            <div class="gacha-card-back">?</div>
        </div>
    `;
    container.appendChild(card);
    return card;
}
function performGacha(count) {
    stopAllSounds();
    const resultContainer = document.getElementById('gacha-result');
    resultContainer.innerHTML = '';
    const drawn = [];
    for (let i = 0; i < count; i++) {
        drawn.push(drawOne());
    }
    const cards = [];
    drawn.forEach((char) => {
        const card = renderCard(char, resultContainer);
        cards.push({ char, card });
    });
    const normal = cards.filter(item => !item.char.sound);
    const special = cards.filter(item => item.char.sound);
    normal.forEach((item, index) => {
        setTimeout(() => {
            item.card.classList.add('flipped');
        }, index * 80);
    });
    const totalNormalDelay = normal.length * 80;
    special.forEach((item, index) => {
        setTimeout(() => {
            const card = item.card;
            card.classList.add('flipped', 'rare');
            if (item.char.highlight) {
                card.classList.add('card-highlight');
            }
            if (item.char.sound) {
                playCharacterSound(item.char.sound);
            }
        }, totalNormalDelay + 100 + index * 80);
    });
    }
function drawOne() {
    const data = window.characters || characters;
    if (!data || data.length === 0) {
        console.error('角色数据未加载！');
        return { name: '未知', rarity: 'R', color: '#999', emoji: '❓' };
    }
    const idx = Math.floor(Math.random() * data.length);
    return data[idx];
}
document.addEventListener('DOMContentLoaded', function() {
    const btnOne = document.getElementById('gacha-one');
    const btnTen = document.getElementById('gacha-ten');
    
    if (btnOne) {
        btnOne.addEventListener('click', function() {
            performGacha(1);
        });
    } else {
        console.warn('未找到 #gacha-one 按钮');
    }
    
    if (btnTen) {
        btnTen.addEventListener('click', function() {
            performGacha(10);
        });
    } else {
        console.warn('未找到 #gacha-ten 按钮');
    }
});