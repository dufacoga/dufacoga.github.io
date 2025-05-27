// Toggles between light and dark themes and returns the new theme
window.toggleTheme = function () {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    return newTheme;
};

// Returns the current active theme
window.getCurrentTheme = function () {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme ? theme : "default";
};

// Sets a specific theme (default, light, dark) and notifies Blazor
window.setTheme = function (theme) {
    if (theme === "default") {
        document.documentElement.removeAttribute("data-theme");
    } else {
        document.documentElement.setAttribute("data-theme", theme);
    }

    if (window._themeCallback) {
        window._themeCallback.invokeMethodAsync("NotifyThemeChange", theme);
    }

    return theme;
};

// Registers a Blazor callback to notify when theme changes
window.registerThemeChangeHandler = function (dotnetRef) {
    window._themeCallback = dotnetRef;
};

// Dropdown behavior (open/close)
window.toggleDropdown = function (event) {
    event.stopPropagation();
    const dropdown = document.getElementById("themeDropdown");
    dropdown.classList.toggle("open");
};

document.addEventListener("click", function (e) {
    const dropdown = document.getElementById("themeDropdown");
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
    }
});