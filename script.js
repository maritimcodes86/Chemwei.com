"use strict";

document.documentElement.classList.add("js");

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const menuToggle = document.querySelector(".menu-toggle");
const navigationPanel = document.querySelector(".navigation-panel");
const navigationLinks = document.querySelectorAll(".navigation-links a");
const currentYear = document.querySelector("#current-year");

function getSavedTheme() {
	try {
		return localStorage.getItem("portfolio-theme");
	} catch {
		return null;
	}
}

function saveTheme(theme) {
	try {
		localStorage.setItem("portfolio-theme", theme);
	} catch {
		// The theme still works for this visit when storage is unavailable.
	}
}

function setTheme(theme) {
	const isDark = theme === "dark";
	root.dataset.theme = isDark ? "dark" : "light";
	themeToggle.setAttribute("aria-pressed", String(isDark));
	themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
	themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
}

const savedTheme = getSavedTheme();
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
	const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
	setTheme(nextTheme);
	saveTheme(nextTheme);
});

menuToggle.addEventListener("click", () => {
	const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
	menuToggle.setAttribute("aria-expanded", String(!isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
	navigationPanel.classList.toggle("is-open", !isOpen);
});

function closeNavigation() {
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Open navigation menu");
	navigationPanel.classList.remove("is-open");
}

navigationLinks.forEach((link) => {
	link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") {
		closeNavigation();
	}
});

if (currentYear) {
	currentYear.textContent = String(new Date().getFullYear());
}
