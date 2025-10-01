function setUsernameCookie(name) {
    const encoded = encodeURIComponent(name.trim());
    const maxAge = 7 * 24 * 60 * 60;
    document.cookie = `username=${encoded}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function getUsernameCookieBySplit() {
    const pairs = document.cookie.split(';');
    for (let i = 0; i < pairs.length; i++) {
        const [key, value] = pairs[i].trim().split('=');
        if (key === 'username') return decodeURIComponent(value || '');
    }
    return '';
}

function updateProfileNameFromCookie() {
    const name = getUsernameCookieBySplit();
    const target = document.getElementById('profile-name');
    target.innerText = name ? name : 'Guest';
}

document.addEventListener('DOMContentLoaded', () => {
    updateProfileNameFromCookie();

    document.getElementById('save').addEventListener('click', () => {
        const input = document.getElementById('username').value;
        if (!input.trim()) { alert('Please enter your name first'); return; }
        setUsernameCookie(input);
        updateProfileNameFromCookie();
        alert('Name saved to cookie');
    });

    document.getElementById('delete').addEventListener('click', () => {
        document.cookie = 'username=; max-age=0; path=/;';
        updateProfileNameFromCookie();
        alert('Cookie deleted');
    });
});