/* eslint-disable no-plusplus */
export default class AnimationOnScroll {
	static displayElementsOnlyTwoElements = false;

	constructor({
		triggerHeight,
		targetElements,
		typeOfAnimation,
		animationClass,
		animationInterval = 0,
		animationClassSecondary
	}) {
		this.targetHeight = triggerHeight;
		this.targets = document.querySelector(targetElements);
		this.liveTargets = this.targets.children;
		this.animationType = typeOfAnimation;
		this.primaryAnimation = animationClass;
		this.secondaryAnimation = animationClassSecondary;
		this.interval = animationInterval;
		this.scriptInitialized = false;
	}

	init() {
		this.#hideElements(this.liveTargets);
		this.#displayElements(
			this.liveTargets,
			this.primaryAnimation,
			this.secondaryAnimation || this.primaryAnimation
		);
	}

	#hideElements(elements) {
		for (const element of elements) {
			element.style.display = "none";
		}
	}

	#displayElements(elements, mainAnimation, additionalAnimation) {
		document.addEventListener("scroll", () => {
			if (this.scriptInitialized) return;
			if (window.scrollY >= this.targetHeight) {
				switch (this.animationType) {
					case "all":
						this.#displayAllElementsAtOnce(elements, mainAnimation);
						this.scriptInitialized = true;
						break;
					case "oneAfterAnother":
						this.#displayElementsOneAfterAnother(elements, mainAnimation);
						this.scriptInitialized = true;
						break;
					case "random":
						this.#displayElementsRandomly(elements, mainAnimation);
						this.scriptInitialized = true;
						break;
					case "two":
						this.#displayElementsOnlyTwoElements(
							elements,
							mainAnimation,
							additionalAnimation
						);
						this.scriptInitialized = true;
						AnimationOnScroll.displayElementsOnlyTwoElements = true;
						break;
					default:
						this.#displayAllElementsAtOnce(elements, mainAnimation);
						this.scriptInitialized = true;
				}
			}
		});
	}

	#displayElementsRandomly(elements, animation) {
		const arrayOfIndexes = [];
		const mixedArrayOfIndexes = [];
		const createArrayOfIndexes = arrayOfElements => {
			for (let i = 0; i < arrayOfElements.length; i++) {
				arrayOfIndexes.push(i);
			}
		};
		const mixArrayOfIndexes = (array, totalElements = 1) => {
			for (let i = 0; i < totalElements; ) {
				const random = Math.floor(Math.random() * array.length);
				if (mixedArrayOfIndexes.indexOf(array[random]) !== -1) {
					// eslint-disable-next-line no-continue
					continue;
				}
				mixedArrayOfIndexes.push(array[random]);
				i++;
			}
		};
		createArrayOfIndexes(elements);
		mixArrayOfIndexes(arrayOfIndexes, arrayOfIndexes.length);
		for (let i = 0; i < elements.length; i++) {
			setTimeout(() => {
				elements[mixedArrayOfIndexes[i]].style.display = "block";
				elements[mixedArrayOfIndexes[i]].classList.add(animation);
			}, this.interval * i);
		}
	}

	#displayElementsOneAfterAnother(elements, animation) {
		for (let i = 0; i < elements.length; i++) {
			setTimeout(() => {
				elements[i].style.display = "block";
				elements[i].classList.add(animation);
			}, this.interval * i);
		}
	}

	#displayAllElementsAtOnce(elements, animation) {
		for (const element of elements) {
			element.style.display = "block";
			element.classList.add(animation);
		}
	}

	#displayElementsOnlyTwoElements(elements, firstAnimation, secondAnimation) {
		const animations = [firstAnimation, secondAnimation];
		for (let i = 0; i < elements.length; i++) {
			setTimeout(() => {
				elements[i].style.display = "block";
				elements[i].classList.add(animations[i]);
			}, this.interval * i);
		}
	}
}
