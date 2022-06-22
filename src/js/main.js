import "../sass/main.sass";
import "swiper/css";
import "swiper/css/effect-fade";
import Swiper, { Autoplay, Mousewheel, EffectFade } from "swiper";
import AnimationOnScroll from "./modules/animationOnScroll";
import ImageSwitcher from "./modules/imageSwitcher";
import Scroll from "./modules/scroll";
import Modal from "./modules/modal";
import Forms from "./modules/forms";
import spinner from "../img/spinner.svg";

Swiper.use([Autoplay, Mousewheel, EffectFade]);

window.addEventListener("load", () => {
	document.addEventListener("scroll", () => {
		if (document.querySelector(".simpleSlider").dataset.sliderInitialized === "true") return;
		if (AnimationOnScroll.displayElementsOnlyTwoElements) {
			if (document.querySelector(".simpleSlider").dataset.sliderInitialized === "false") {
				const simpleSlider = new Swiper(".swiper", {
					autoplay: {
						delay: 4000,
						disableOnInteraction: true
					},
					mousewheel: true,
					loop: true,
					speed: 800,
					slidersPerView: 1,
					effect: "fade",
					spaceBetween: 0
				});
				simpleSlider.init();
				document.querySelector(".simpleSlider").dataset.sliderInitialized = "true";
			}
		}
	});

	const servicesAnimationOnScroll = new AnimationOnScroll({
		triggerHeight: 1000,
		targetElements: ".service-list",
		typeOfAnimation: "",
		animationInterval: 0,
		animationClass: "fade-in-bottom"
	});

	const discountAnimationOnScroll = new AnimationOnScroll({
		triggerHeight: 2100,
		targetElements: ".discount__content",
		typeOfAnimation: "two",
		animationClass: "fade-in-bottom",
		animationInterval: 0,
		animationClassSecondary: "fade-in-top"
	});

	const newServiceAnimationOnScroll = new AnimationOnScroll({
		triggerHeight: 3000,
		targetElements: ".new-service__content",
		typeOfAnimation: "two",
		animationClass: "fade-in-top",
		animationInterval: 0,
		animationClassSecondary: "fade-in-bottom"
	});

	const giftCardsAnimationOnScroll = new AnimationOnScroll({
		triggerHeight: 4200,
		targetElements: ".gift-cards-list",
		typeOfAnimation: "all",
		animationInterval: 0,
		animationClass: "fade-in-fwd"
	});

	const partnersAnimationOnScroll = new AnimationOnScroll({
		triggerHeight: 5200,
		targetElements: ".partners-list",
		typeOfAnimation: "all",
		animationInterval: 0,
		animationClass: "fade-in-fwd"
	});

	const imageSwitcher = new ImageSwitcher({
		targetImageWindow: ".new-service__main-image",
		triggerImages: ".image-list__item",
		mainImageAnimation: "fade-in",
		mainImageAnimationDuration: 400
	});

	const scroll = new Scroll({
		entryAnimationClass: "button-fade-in",
		outroAnimationClass: "button-fade-out"
	});

	const modal = new Modal({
		triggerBtns: "[data-modal]",
		modalSelector: ".modal",
		modalWrapperSelector: ".modal__wrapper",
		showAnimationClass: "modal-fade-in",
		hideAnimationClass: "modal-fade-out",
		closeModalTriggerBtn: ".modal-btn-close",
		closeModalWindowByEsc: true,
		closeModalWindowByClickAndBtn: true
	});

	const modalCard = new Modal({
		triggerBtns: "[data-modal-card]",
		modalSelector: "#modal-gift-card",
		modalWrapperSelector: "#modal-gift-card-wrapper",
		showAnimationClass: "modal-fade-in",
		hideAnimationClass: "modal-fade-out",
		closeModalTriggerBtn: ".modal-btn-close",
		closeModalWindowByEsc: true,
		closeModalWindowByClickAndBtn: true
	});

	const serviceForm = new Forms({
		triggerForm: "#serviceForm",
		databaseName: "boughtServices",
		spinnerSrc: spinner,
		sendDataButton: "#serviceForm-send-data"
	});

	const giftCardForm = new Forms({
		triggerForm: "#gift-card-form",
		databaseName: "boughtGiftCards",
		spinnerSrc: spinner,
		sendDataButton: "#gift-card-form-send-data"
	});

	servicesAnimationOnScroll.init();
	discountAnimationOnScroll.init();
	newServiceAnimationOnScroll.init();
	giftCardsAnimationOnScroll.init();
	partnersAnimationOnScroll.init();
	imageSwitcher.init();
	scroll.init();
	modal.init();
	modalCard.init();
	serviceForm.init();
	giftCardForm.init();
});
