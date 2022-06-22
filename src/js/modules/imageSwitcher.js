export default class ImageSwitcher {
	constructor({
		targetImageWindow,
		triggerImages,
		mainImageAnimation,
		mainImageAnimationDuration
	}) {
		this.target = document.querySelector(targetImageWindow);
		this.triggers = document.querySelectorAll(triggerImages);
		this.animation = mainImageAnimation;
		this.animationDuration = mainImageAnimationDuration;
	}

	init() {
		this.triggers.forEach(image => {
			image.addEventListener("click", e => {
				this.#switchImage(e.target);
			});
		});
	}

	#switchImage(target) {
		this.target.src = target.src;
		this.target.classList.add(this.animation);
		this.#clearAnimationClass();
	}

	#clearAnimationClass() {
		setTimeout(() => {
			this.target.classList.remove(this.animation);
		}, this.animationDuration);
	}
}
