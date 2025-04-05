export const onlyNumbers = (event) => {
	if (!/^\d$/.test(event.key)) {
		event.preventDefault();
	}
};
export function formatPhoneNumber(phoneNumber) {
	if (!phoneNumber) return '';

	const cleanedNumber = phoneNumber.replace(/\D/g, '');

	if (cleanedNumber.length === 9) {
		return cleanedNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '+998 ($1) $2 $3 $4');
	}

	if (cleanedNumber.length === 12) {
		return cleanedNumber.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3 $4 $5');
	}

	return phoneNumber;
}

export function formatPrice(price) {
	if (!price) return '0';
	return Number(price).toLocaleString('en-US');
}

export const categories = [
	{
		id: '258d6df1-afc2-48de-b658-095db6db550b',
		slug: 'pilaf-8nu4ob1ldxf86jy',
		parent_id: '',
		image: '8f797f17-3b5d-4837-93ef-a277272ee88c',
		description: {
			uz: '',
			ru: '',
			en: ''
		},
		title: {
			uz: 'Oshlar',
			ru: 'Плов',
			en: 'Pilaf'
		},
		order_no: '1',
		active: true,
		products: [
			{
				id: 'bfc8cc6f-7350-48a9-8caf-ad408d696167',
				slug: 'toj-oshi-1-d-3nvkj1lnufz9st',
				out_price: 44000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['258d6df1-afc2-48de-b658-095db6db550b'],
				brand_id: '',
				rate_id: '',
				image: 'b00d2156-eb76-4d0f-a49c-3a18ad9afd54',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'To`y oshi',
					ru: 'Свадебный плов ',
					en: 'Wedding pilaf'
				},
				description: {
					uz: "Qo'y va mol go‘shtining mayinligi, xushbo‘y lazer guruchi, sariq va qizil sabzi, ziravorlar sizning mehmonlaringizni xursand qiladi va taomni yanada maxsus ekanligini bildirib turadi. ",
					ru: 'Нежное мясо баранины и говядины, ароматный рис лазер, желтая и красная морковь и специи создают идеальное блюдо, которое порадует ваших гостей и сделает трапезу еще более особенной ',
					en: 'Tender meat, fragrant rice, and spices create the perfect dish that will delight your guests and make the meal even more special. Order now and add an unforgettable taste to your day!'
				},
				active: true,
				iiko_id: 'a1d736a5-382e-47f4-8346-43e8cf07ae81',
				jowi_id: '6e68b07e-a8ce-4fca-82de-3c72cf07c8c7',
				discounts: null,
				rating: 0,
				weight: 500,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '8d8f195a-f37d-4e6b-8d61-0e2cee858c4a',
				slug: 'chojhona-osh-1-d-3nvkj1lnufz9t3',
				out_price: 46000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['258d6df1-afc2-48de-b658-095db6db550b'],
				brand_id: '',
				rate_id: '',
				image: '54744337-1e64-4934-951e-409d33b0eb40',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Choyxona oshi',
					ru: 'Чайханский плов',
					en: 'Choyxona pilaf'
				},
				description: {
					uz: "An'anaviy Choyxona palovini kashf eting! Shirali qo'y go‘shti, xushbo‘y lazer guruchi, sariq sabzi va ziravorlar ajoyib taom yaratadi. Hoziroq buyurtma bering va sharq oshxonasining haqiqiy ta'midan rohatlaning!",
					ru: 'Откройте для себя традиционный Чайханский плов! Сочное мясо баранины, ароматный рис лазер, желтая морковь и специи создают восхитительное блюдо. Закажите сейчас и наслаждайтесь истинным вкусом восточной кухни!',
					en: 'Discover traditional Chaykhana plov! Juicy meat, fragrant rice, and spices create a delightful dish. Order now and enjoy the true taste of Eastern cuisine!'
				},
				active: true,
				iiko_id: '171d64eb-8417-4a75-8fc6-a138e094c18e',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 450,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'd19d1242-1124-4a8a-8394-bb5e042aeb6c',
				slug: 'zigir-pilaf',
				out_price: 46000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['258d6df1-afc2-48de-b658-095db6db550b'],
				brand_id: '',
				rate_id: '',
				image: 'c956e94b-95e5-4e6a-ae7e-9326821d0b01',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Zig'ir oshi",
					ru: 'Самаркандский зигир',
					en: 'Zigir pilaf'
				},
				description: {
					uz: "Samarqand zigi'r oshini tatib ko'ring! O'zgacha to'g'ralgan go‘sht, xushbo‘y ziravorlar va zig'ir yog'i o'ziga xos ta'mga ega nafis taom yaratadi. Hoziroq buyurtma bering va Samarqandning haqiqiy kulinariya asaridan bahramand bo'ling!",
					ru: 'Попробуйте Самаркандский зигир! Тонко нарезанное мясо говядины, ароматные специи и льняное масло создают изысканное блюдо с неповторимым вкусом. Закажите сейчас и насладитесь настоящим кулинарным шедевром Самарканда!',
					en: 'Try Samarkand Zigir! Thinly sliced meat, aromatic spices, and flaxseed oil create an exquisite dish with a unique flavor. Order now and enjoy a true culinary masterpiece of Samarkand!'
				},
				active: true,
				iiko_id: 'a1ff7662-cb0d-4fa4-b4b9-a2a824effe0a',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '198111ed-ed80-49c1-abab-f16947578161',
				slug: 'toj-oshi-1-komplekt-d-3nvkj1lnufz9su',
				out_price: 58500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['258d6df1-afc2-48de-b658-095db6db550b'],
				brand_id: '',
				rate_id: '',
				image: 'f07f94d7-c960-44a0-ad2f-235984e967ad',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'To`y oshi komplekt',
					ru: 'Свадебный плов комплект ',
					en: 'Wedding pilaf complete '
				},
				description: {
					uz: "Go‘shtning mayinligi, xushbo‘y guruch va ziravorlar sizning mehmonlaringizni xursand qiladi va taomni yanada maxsus ekanligini bildirib turadi. Hoziroq buyurtma bering va kuningizga unutilmas ta'm qo'shing!",
					ru: 'Нежное мясо баранины и говядины, ароматный рис лазер, желтая и красная морковь и специи создают идеальное блюдо, которое порадует ваших гостей и сделает трапезу еще более особенной',
					en: 'Tender meat, fragrant rice, and spices create the perfect dish that will delight your guests and make the meal even more special. Order now and add an unforgettable taste to your day!'
				},
				active: true,
				iiko_id: '98fc5773-dca3-4aa6-b6df-20c474657ca2',
				jowi_id: 'dcf666a6-a77e-11ed-9902-1b6b9aa9e325',
				discounts: null,
				rating: 0,
				weight: 500,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'd934d0b2-5329-4ca5-855c-1097a70392ba',
				slug: 'choyxona-pilaf',
				out_price: 60500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['258d6df1-afc2-48de-b658-095db6db550b'],
				brand_id: '',
				rate_id: '',
				image: '697c3044-afd5-4b45-97a2-fc9a579305b3',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Choyxona oshi komplekt ',
					ru: 'Чайханский плов комплект',
					en: 'Choyxona pilaf'
				},
				description: {
					uz: "An'anaviy Choyxona palovini kashf eting! Shirali qo'y go‘shti, xushbo‘y lazer guruchi, sariq sabzi va ziravorlar ajoyib taom yaratadi. Hoziroq buyurtma bering va sharq oshxonasining haqiqiy ta'midan rohatlaning!",
					ru: 'Откройте для себя традиционный Чайханский плов! Сочное мясо баранины, ароматный рис лазер, желтая морковь и специи создают восхитительное блюдо. Закажите сейчас и наслаждайтесь истинным вкусом восточной кухни!',
					en: 'Discover traditional Chaykhana plov! Juicy meat, fragrant rice, and spices create a delightful dish. Order now and enjoy the true taste of Eastern cuisine!'
				},
				active: true,
				iiko_id: 'a868673f-a18e-4777-a755-96390592fd70',
				jowi_id: '6d32d8b8-a77e-11ed-a2ce-6beacfd294b5',
				discounts: null,
				rating: 0,
				weight: 450,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'b3f4c261-fb94-4ce1-8cad-19d1d7c40ab0',
				slug: 'zigir-osh-1p-komplekt-d-3nvkj1lnufz9q8',
				out_price: 60500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['258d6df1-afc2-48de-b658-095db6db550b'],
				brand_id: '',
				rate_id: '',
				image: '04eb7acb-cee3-4720-a4fc-160cb2bb78c4',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Zig'ir oshi komplekt",
					ru: 'Самаркандский зигир комплект',
					en: 'Zigir pilaf Complete '
				},
				description: {
					uz: "Samarqand zigi'r oshini tatib ko'ring! O'zgacha to'g'ralgan go‘sht, xushbo‘y ziravorlar va zig'ir yog'i o'ziga xos ta'mga ega nafis taom yaratadi. Hoziroq buyurtma bering va Samarqandning haqiqiy kulinariya asaridan bahramand bo'ling!",
					ru: 'Попробуйте Самаркандский зигир! Тонко нарезанное мясо говядины, ароматные специи и льняное масло создают изысканное блюдо с неповторимым вкусом. Закажите сейчас и насладитесь настоящим кулинарным шедевром Самарканда!',
					en: 'Try Samarkand Zigir! Thinly sliced meat, aromatic spices, and flaxseed oil create an exquisite dish with a unique flavor. Order now and enjoy a true culinary masterpiece of Samarkand!'
				},
				active: true,
				iiko_id: '9d2ad3bb-9df7-4792-93f1-82fe7c85f310',
				jowi_id: 'c9ddc982-0f21-11e9-a690-03171f8e7663',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'd8bc29da-bb81-41d2-a331-3912167d8d7d',
				slug: 'devzira-osh',
				out_price: 49000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['258d6df1-afc2-48de-b658-095db6db550b'],
				brand_id: '',
				rate_id: '',
				image: 'ef2aae8a-5e4b-416a-8819-65bb7e45d9e8',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Chung'ara osh",
					ru: 'Чунгара плов',
					en: 'Chungara pilaf'
				},
				description: {
					uz: '',
					ru: '',
					en: ''
				},
				active: true,
				iiko_id: 'b24639dc-b44c-4892-beb7-c87d822f3db1',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '3404e309-943a-4b55-89ab-5fac5724fdcd',
				slug: 'devzira-osh-komplekt',
				out_price: 63500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['258d6df1-afc2-48de-b658-095db6db550b'],
				brand_id: '',
				rate_id: '',
				image: '2fdd0112-a2c6-487a-8091-24c07d8d10eb',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Chung'ara osh komplekt",
					ru: 'Чунгара плов комплект',
					en: 'Chungara pilaf set'
				},
				description: {
					uz: '',
					ru: '',
					en: ''
				},
				active: true,
				iiko_id: '31a2c090-4921-49d9-9540-279fd46878ed',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			}
		],
		child_categories: null,
		seo_text: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_h1: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_title: {
			uz: '',
			ru: '',
			en: ''
		}
	},
	{
		id: '5e2b453d-3df3-4665-ad8a-77583d9917b4',
		slug: 'soups-8nu4ob1ldxf909h',
		parent_id: '',
		image: 'a1933bf8-0dea-40d4-b273-5077cb5032a9',
		description: {
			uz: '',
			ru: '',
			en: ''
		},
		title: {
			uz: "Sho'rvalar",
			ru: 'Супы',
			en: 'Soups'
		},
		order_no: '2',
		active: true,
		products: [
			{
				id: '2a151502-fabb-4251-a7a8-909c44dbed8c',
				slug: 'dumgaza-shurva-d-3nvkj1lnufz9si',
				out_price: 46500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['5e2b453d-3df3-4665-ad8a-77583d9917b4'],
				brand_id: '',
				rate_id: '',
				image: 'f7abb35b-53d7-4c58-ad4a-1fd6947810bb',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Dumg'aza sho'rva",
					ru: 'Суп из хвоста',
					en: 'Dumgaza soup'
				},
				description: {
					uz: "Bizning noyob dum sho'rvamizni tatib ko'ring! Dum go'shti, xushbo'y ziravorlar va yangi sabzavotlar asta-sekin pishiriladi, to'yimli va boy bulyon hosil qiladi. Bu sho'rva sizni isitadi va haqiqiy zavq bag'ishlaydi. Hozir buyurtma qiling va haqiqiy ta'mdan bahramand bo'ling",
					ru: 'Попробуйте наш уникальный суп из хвоста! Нежное мясо хвоста, ароматные специи и свежие овощи медленно томятся, создавая насыщенный и питательный бульон. Этот суп согреет вас и подарит истинное наслаждение. Закажите сейчас и оцените настоящий вкус',
					en: 'Try our unique oxtail soup! Tender oxtail meat, aromatic spices, and fresh vegetables simmer slowly to create a rich and nutritious broth. This soup will warm you up and provide true enjoyment. Order now and savor the authentic taste'
				},
				active: true,
				iiko_id: 'e7b526a6-5664-45e6-97ed-12674a8119ab',
				jowi_id: '9ca5e0d7-343d-499c-8b41-57be13c553d1',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '71d72f5f-5afe-4f1d-9058-ea2e8b873cef',
				slug: 'achchik-shurva',
				out_price: 11500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['5e2b453d-3df3-4665-ad8a-77583d9917b4'],
				brand_id: '',
				rate_id: '',
				image: 'f9aacced-ea00-467e-8338-4d8eed034a38',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Achchiq sho'rva",
					ru: 'Острый суп',
					en: 'Spicy soup'
				},
				description: {
					uz: 'Achchiq sho‘rvamizni tatib ko‘ring! Bu boy bulyon, jizza, suzma va qalampir bilan o‘ziga xos ta’m va achchiqlik uyg‘unligini yaratadi. Go‘sht va sabzavotsiz, bu sho‘rva sizga haqiqiy rohat bag‘ishlaydi',
					ru: 'Попробуйте наш острый суп! Этот насыщенный бульон с жиззой, сузьмой и перцем создаёт уникальное сочетание вкусов и остроты. Без мяса и овощей, этот суп подарит вам истинное наслаждение',
					en: 'Try our spicy soup! This rich broth with jizza, suzma, and pepper creates a unique combination of flavors and heat. Without meat and vegetables, this soup will provide you with true enjoyment'
				},
				active: true,
				iiko_id: '8cafb88d-b27a-400d-9a69-e1a9c0ae8b7a',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 200,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '4fa96114-9af1-40f3-a472-0be4b8fe1674',
				slug: 'halim',
				out_price: 33500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['5e2b453d-3df3-4665-ad8a-77583d9917b4'],
				brand_id: '',
				rate_id: '',
				image: 'de3b2742-6c84-48f2-a00d-e7fff4409fc3',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Halim',
					ru: 'Халим',
					en: 'Halim'
				},
				description: {
					uz: "Bizning to‘yimli Xalimimizni tatib ko‘ring! Bu an'anaviy taom mayin go‘sht, bug‘doy va xushbo‘y ziravorlardan tayyorlanib, mukammal ta'mga yetguncha sekin olovda pishiriladi. Xalim sizni isitadi va Sharqning boy ta’mini taqdim etadi. Hozir buyurtma qiling va rohatlaning!",
					ru: 'Попробуйте наш питательный Халим! Это традиционное блюдо готовится из нежного мяса, пшеницы и ароматных специй, медленно томится до достижения идеальной консистенции. Халим согреет вас и подарит насыщенный вкус Востока. Закажите сейчас и наслаждайтесь!',
					en: 'Try our nutritious Halim! This traditional dish is made from tender meat, wheat, and aromatic spices, simmered slowly to achieve the perfect consistency. Halim will warm you up and offer the rich flavors of the East. Order now and enjoy!'
				},
				active: true,
				iiko_id: 'ed4fca43-c939-48e6-99d9-20bcc166ba33',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 500,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '63d53995-b1cb-4087-9ecb-94414868369b',
				slug: 'chuchvara-d-3nvkj1lnufz9sq',
				out_price: 29500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['5e2b453d-3df3-4665-ad8a-77583d9917b4'],
				brand_id: '',
				rate_id: '',
				image: 'd5c82756-30d5-4921-8b72-74961341b529',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Chuchvara',
					ru: 'Чучвара',
					en: 'Chuchvara'
				},
				description: {
					uz: "Chuchvara - anʼanaviy o‘zbek taomi, shirali go‘shtli qiyma bilan to‘ldirilgan va tayyor bo‘lguncha qaynatilgan. Taom qatiq bilan beriladi, bu esa taomga o'zgacha yangi taʼm beradi. Ushbu klassik o‘zbek taomining boy taʼmi va hididan bahramand bo‘ling. Biz chuchvaralarimiz yanada shirinroq bo'lishi uchun qo'y goshti bilan mol goshtini ishlatamiz",
					ru: 'Чучвара - традиционные узбекские пельмени, наполненные сочным говяжьем фаршем и вареные до готовности. Подаются с кефиром, что придает блюду освежающий вкус. Насладитесь богатым вкусом и ароматом этого классического блюда узбекской кухни. Для начинки чучвары мы используем баранину и говяжье мясо',
					en: 'Chuchvara is a traditional Uzbek dumpling filled with juicy minced meat and boiled until tender. Served with kefir, which gives the dish a refreshing taste. Enjoy the rich taste and aroma of this classic dish of Uzbek cuisine. For the filling of chuchvara we use lamb and beef meat'
				},
				active: true,
				iiko_id: '3e619c32-60da-41b4-857a-e52dd70ec182',
				jowi_id: '16dbdcf4-e951-495d-9518-ef3c0807cf6b',
				discounts: null,
				rating: 0,
				weight: 100,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'a9817631-2720-4cb1-a95e-e61108dcecd7',
				slug: 'hash',
				out_price: 43000,
				currency: '',
				string: '',
				type: 'simple',
				categories: ['5e2b453d-3df3-4665-ad8a-77583d9917b4'],
				brand_id: '',
				rate_id: '',
				image: '6b403082-40af-4695-9631-73e2cd214693',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Xash',
					ru: 'Хаш',
					en: 'Khash'
				},
				description: {
					uz: "Xash — bu an’anaviy va to‘yinuvchi taomidir, bu o‘zining ajoyib ta’mi bilan sizni hayratga soladi. O‘zining boy ta’mlari va tasalli beruvchi xususiyati bilan ma’lum bo‘lgan Xash — vaqt sinovidan o‘tgan usullarda tayyorlanadigan sekin pishirilgan mol go‘shti yoki qo‘y go‘shti sho‘rvasidir. Odatda jamoaviy yig'ilishlarda iste’mol qilinadigan bu oziqlantiruvchi taom odamlarni birlashtirib, chuqur qoniqarli oshpazlik tajribasini taqdim etadi. Xashning boy mazmunidan zavqlaning, bu yerda yumshoq go‘sht mukammal baharatlangan buloq bilan ajoyib tarzda uyg‘unlashadi. Bu shunchaki taom emas, balki an’analar va birlashish bayramidir.",
					ru: 'Хаш — это традиционное и сытное блюдо, которое обязательно порадует ваши вкусовые рецепторы. Известный своим богатым вкусом и успокаивающим характером, хаш — это тушеное мясо из говядины или ягненка, медленно приготовленное с использованием проверенных временем техник. Чаще всего его подают на совместных собраниях, это питательное блюдо объединяет людей, предлагая глубоко удовлетворяющий кулинарный опыт. Насладитесь насыщенной сутью хаша, где нежное мясо идеально сочетается с ароматным бульоном. Это больше, чем просто блюдо; это праздник традиций и единения.',
					en: "Khash is a traditional and hearty dish that is sure to captivate your taste buds. Known for its rich flavors and comforting nature, Khash is a slow-cooked beef or lamb stew, meticulously prepared using time-honored techniques. Often enjoyed during communal gatherings, this nourishing dish brings people together, offering a deeply satisfying culinary experience. Savor the robust essence of Khash, where tender meat melds beautifully with a flavorful broth, seasoned to perfection. It’s more than just a meal; it's a celebration of tradition and togetherness."
				},
				active: true,
				iiko_id: '4636bb73-ab5a-44b9-98cf-f812b6c1bf54',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'caf23767-46fb-4171-a796-14c500e51d2d',
				slug: 'ilik-shurva-405h0e1l9mss85p',
				out_price: 41500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['5e2b453d-3df3-4665-ad8a-77583d9917b4'],
				brand_id: '',
				rate_id: '',
				image: 'b7cb0957-526e-48f6-81c3-4db9f139b5db',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Ilik sho'rva",
					ru: 'Илик шурпа',
					en: 'Ilik shurpa'
				},
				description: {
					uz: "Ilik sho'rva – bu an'anaviy o'zbek sho'rvasi bo'lib, suyakli qo'y go'shtidan, sabzavotlar va ziravorlardan tayyorlanadi. Sho'rva to'yimli va xushbo'y, go'shti esa yumshoq va shirali bo'ladi. Ushbu taom nafaqat mazali, balki juda to'yimli bo'lib, sovuq ob-havo uchun ideal.",
					ru: 'Илик шурпа – это традиционный узбекский суп, приготовленный из баранины на косточке с добавлением овощей и специй. Бульон получается насыщенным и ароматным, а мясо - нежным и сочным. Этот суп не только вкусный, но и очень питательный, идеально подходящий для холодного времени года',
					en: 'Ilik shurpa is a traditional Uzbek soup made from lamb on the bone with the addition of vegetables and spices. The broth is rich and aromatic, and the meat is tender and juicy. This soup is not only delicious but also very nutritious, making it perfect for cold weather.'
				},
				active: true,
				iiko_id: '9db41792-efc9-44de-8e4b-db647836baee',
				jowi_id: '357b1aac-8812-4baf-b9c9-d3eabf9d58aa',
				discounts: null,
				rating: 0,
				weight: 400,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '140d21ec-eb0b-4fac-91fc-daa43d5fdd61',
				slug: 'mastava-405h0e1l9msvpf0',
				out_price: 29500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['5e2b453d-3df3-4665-ad8a-77583d9917b4'],
				brand_id: '',
				rate_id: '',
				image: '5c4bf6b8-c073-49ef-ad2d-d653af568ad2',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Mastava',
					ru: 'Мастава',
					en: 'Mastava'
				},
				description: {
					uz: "Mastava ba'zi ingredientlarning o'xshashligi va tayyorlash usuli tufayli ko'pincha \"suyuq palov\" deb ataladi.  Ushbu taomga guruch, kartoshka, pomidor, sabzi va qo'y go'sht kiradi",
					ru: 'Сытный, ароматный и такой родной суп — мастава. Мы не знаем ни одной семьи, в которой бы его не готовили. В состав этого блюдо входит рис, картофель, помидор, морковь, баранина',
					en: 'Hearty, aromatic and so familiar soup - mastava. We don’t know a single family that doesn’t cook it. This dish includes rice, potatoes, tomatoes, carrots and meat (lamb)'
				},
				active: true,
				iiko_id: '3077beeb-4f91-459b-8ebe-b88136968971',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 400,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			}
		],
		child_categories: null,
		seo_text: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_h1: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_title: {
			uz: '',
			ru: '',
			en: ''
		}
	},
	{
		id: '3aebe92f-698a-4cfa-b7bc-6bfca32a1ac9',
		slug: 'second-dishes',
		parent_id: '',
		image: 'd26d7193-bf03-4ef6-85c0-53be4a50aa85',
		description: {
			uz: '',
			ru: '',
			en: ''
		},
		title: {
			uz: 'Ikkinchi taom',
			ru: 'Вторые блюдо',
			en: 'second dishes'
		},
		order_no: '3',
		active: true,
		products: [
			{
				id: 'b179ddb0-4fdc-4938-a1c4-601f0d66e64a',
				slug: 'beshbarmoq',
				out_price: 83500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['3aebe92f-698a-4cfa-b7bc-6bfca32a1ac9'],
				brand_id: '',
				rate_id: '',
				image: '90fb2d3e-0f15-4077-b663-eff51439b15e',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Beshbarmoq',
					ru: 'Бешбармак ',
					en: 'Beshbarmak'
				},
				description: {
					uz: "Beshbarmoqning asosiy masalliqlari go'sht, shilpildoq hamiri va piyozdir",
					ru: 'Бешбармак — это отварное, мелко нарезанное мясо говядины и баранины, ломтики казы, смешанное с вареным тестом и приправленное пряностями с луковым соусом',
					en: 'Beshbarmak is boiled, finely chopped meat mixed with boiled dough and seasoned with spices and onion sauce'
				},
				active: true,
				iiko_id: 'e15f4244-1ee3-4b8d-87b9-e05d9e826f09',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 500,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '4e332260-9710-4426-b1b4-4784edb16f8d',
				slug: 'moshkichirik',
				out_price: 43500,
				currency: '',
				string: '',
				type: 'simple',
				categories: ['3aebe92f-698a-4cfa-b7bc-6bfca32a1ac9'],
				brand_id: '',
				rate_id: '',
				image: '300d80dd-9c42-430b-ab46-b84cbe4c6862',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Moshkichirik',
					ru: 'Мошкичирик',
					en: 'Moshkichirik'
				},
				description: {
					uz: 'Moshkichri — mash va guruchdan, go‘sht va sabzavotlar bilan birga dimlanadigan xushbo‘y o‘zbek taomidir. Ziravorlar kuchli ta’m beradi, guruch esa sho‘rvani o‘ziga shimib, yumshoq bo‘ladi',
					ru: 'Мошкичри — ароматное блюдо узбекской кухни из маша и риса, томлёных с мясом и овощами. Специи придают насыщенный вкус, а рис впитывает бульон и становится нежным',
					en: 'Moshkichri is an aromatic Uzbek dish made from mung beans and rice, simmered with meat and vegetables. Spices impart a rich flavor, while the rice absorbs the broth and becomes tender'
				},
				active: true,
				iiko_id: 'c137c0f0-9c85-49dc-9df7-fca860919491',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'd91b163c-e64e-4eae-9f2b-7adca97a81d5',
				slug: 'manty-d-3nvkj1lnufz9sj',
				out_price: 10000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['3aebe92f-698a-4cfa-b7bc-6bfca32a1ac9'],
				brand_id: '',
				rate_id: '',
				image: 'eee02698-5ec5-4e52-a2c9-d66693976ac3',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Manti',
					ru: 'Манты',
					en: 'Manti'
				},
				description: {
					uz: "Nozik xamir, mayin go‘sht va xushbo‘y ziravorlar mukammal ta'm uyg‘unligini yaratadi. Har bir manti muhabbat va g‘amxo‘rlik bilan tayyorlanadi, sizga haqiqiy rohat bag‘ishlash uchun. Hozir buyurtma qiling va an'anaviy sharq taomidan bahramand bo‘ling!",
					ru: 'Тонкое тесто, нежное мясо и ароматные специи создают идеальное сочетание вкусов. Каждая манты приготовлена с любовью и заботой, чтобы подарить вам истинное наслаждение. Закажите сейчас и насладитесь традиционным восточным блюдом',
					en: 'Thin dough, tender meat, and aromatic spices create the perfect combination of flavors. Each manti is made with love and care to provide you with true enjoyment. Order now and enjoy this traditional Eastern dish!'
				},
				active: true,
				iiko_id: '0bbd70dc-f77a-484f-a891-29e0b3c757e4',
				jowi_id: 'cfe72410-7afe-410f-a105-6e0ce5f78869',
				discounts: null,
				rating: 0,
				weight: 100,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			}
		],
		child_categories: null,
		seo_text: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_h1: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_title: {
			uz: '',
			ru: '',
			en: ''
		}
	},
	{
		id: '637cb809-cc1f-45e6-a22f-c28c2e36d6d5',
		slug: 'salads-8nu4ob1ldxfbl9m',
		parent_id: '',
		image: 'ed697e69-01e4-4646-b3a6-cf9c0384becf',
		description: {
			uz: '',
			ru: '',
			en: ''
		},
		title: {
			uz: 'Salatlar',
			ru: 'Салаты ',
			en: 'Salads'
		},
		order_no: '4',
		active: true,
		products: [
			{
				id: '28f4d608-05ab-4524-a279-c63e993238df',
				slug: 'achchik-chuchk-d-3nvkj1lnufz9ry',
				out_price: 15500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: '27f58130-c908-4ebc-810a-dec428a333e8',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Achichuk',
					ru: 'Ачичук',
					en: 'Achichuk'
				},
				description: {
					uz: "Achichuq - bu an'anaviy o'zbek salati bo'lib, yangi pomidor, bodring va piyozdan, ko'katlar bilan tayyorlanadi. U tetiklantiruvchi ta'mga ega va ko'pincha asosiy taomlar bilan beriladi.",
					ru: 'Ачичук - это традиционный узбекский салат, состоящий из свежих помидоров, огурцов и лука, приправленных зеленью. Он обладает освежающим вкусом и часто подается к основным блюдам',
					en: 'Achichuk is a traditional Uzbek salad made from fresh tomatoes, cucumbers, and onions, seasoned with herbs. It has a refreshing taste and is often served with main dishes.'
				},
				active: true,
				iiko_id: '0c7a7519-a744-493d-abb0-c059fc113cca',
				jowi_id: 'd75c78a5-0cf8-44b9-8ae8-7f4b4f02b65d',
				discounts: null,
				rating: 0,
				weight: 300,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '4cce5220-b49f-4281-9d6c-d59e0d8aeb9c',
				slug: 'bahor-d-3nvkj1lnufz9rz',
				out_price: 14500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: 'ab97b6c7-d9c3-4ed0-b864-5df8e12133c1',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Bahor salati',
					ru: 'Весенний ',
					en: 'Spring salad'
				},
				description: {
					uz: 'Bahorgi salatimizni tatib ko‘ring! Yangi bodringlar va xushbo‘y ko‘katlar qatiq bilan aralashtirib tayyorlanadi, yengil va tetiklashtiruvchi taom yaratadi. Hozir buyurtma qiling va yangilik ta’midan rohatlaning!',
					ru: 'Попробуйте наш весенний салат! Свежие огурцы и ароматная зелень, заправленные кефиром, создают легкое и освежающее блюдо. Закажите сейчас и насладитесь вкусом свежести',
					en: 'Try our spring salad! Fresh cucumbers and aromatic greens, dressed with kefir, create a light and refreshing dish. Order now and enjoy the taste of freshness!'
				},
				active: true,
				iiko_id: 'ffcd42b3-1caf-46ae-b3dd-65de2f27d5dc',
				jowi_id: 'd2bb0b0c-bfe2-11e8-93df-d37bc4e7602e',
				discounts: null,
				rating: 0,
				weight: 200,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '77816cba-5820-4dd3-bd73-a8914233bc03',
				slug: 'gurob-d-3nvkj1lnufz9s1',
				out_price: 8500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: 'e1058481-3ed4-4684-9a95-2991912c3a4f',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "G'urob",
					ru: 'Гуроб ',
					en: 'Gurob'
				},
				description: {
					uz: "G'urob - bu an'anaviy o'zbek uzum sirkasi bo'lib, ishtahani ochish uchun beriladi. Uning boy va achchiq ta'mi asosiy taomlarga tayyorlanishga yordam beradi.",
					ru: 'Гуроб - это традиционный узбекский виноградный уксус, который подается для стимуляции аппетита. Его насыщенный и пикантный вкус помогает подготовить вкусовые рецепторы к основным блюдам',
					en: 'Gurob is a traditional Uzbek grape vinegar served to stimulate the appetite. Its rich and tangy flavor helps prepare the taste buds for the main dishes.'
				},
				active: true,
				iiko_id: '0c0a2224-4376-4a7c-a54f-bb94a5926ee2',
				jowi_id: '8ad8ca5c-93a6-4cc6-851a-6103c0f3577a',
				discounts: null,
				rating: 0,
				weight: 50,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '4893c2b7-ecbc-4ad0-a537-3882ff16b077',
				slug: 'katik-d-3nvkj1lnufz9s2',
				out_price: 8500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: '5caf1770-ce58-4e4d-87fb-219c2a30c47e',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Qatiq',
					ru: 'Катык',
					en: 'Katyk'
				},
				description: {
					uz: 'Yangi qatiqimizni tatib ko‘ring! Bu to‘yimli ichimlik nozik ta’m va qaymoqli tuzilishga ega bo‘lib, sizga haqiqiy rohat va salomatlik foydasini taqdim etadi',
					ru: 'Попробуйте наш свежий катык! Этот питательный напиток с нежным вкусом и кремовой текстурой подарит вам истинное наслаждение и пользу для здоровья',
					en: ' Try our fresh qatiq! This nutritious drink with a delicate taste and creamy texture will provide you with true enjoyment and health benefits'
				},
				active: true,
				iiko_id: '1e0f066d-ad88-4ec7-84c4-334670cbb60e',
				jowi_id: '0aa8bb99-576f-42cc-aa37-da8837275fbb',
				discounts: null,
				rating: 0,
				weight: 200,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'b4deb4f1-1453-4551-99b8-80b1e803efd4',
				slug: 'marinovannyj-d-3nvkj1lnufz9s3',
				out_price: 12500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: 'f9f29d38-3eac-4340-9bc3-450e5d52155c',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Marinatlangan salat',
					ru: 'Маринованное ассорти',
					en: 'Marinated platter'
				},
				description: {
					uz: 'Marinatlangan salatimizni tatib ko‘ring! Yangi bodring, pomidor cherri va dungan qalampiri mukammallikka yetguncha marinovka qilingan, yorqin va mazali taom yaratadi',
					ru: 'Попробуйте наш маринованный салат! Свежие огурцы, помидоры черри и дунганский перец, замаринованные до совершенства, создают яркое и вкусное блюдо',
					en: 'Try our pickled salad! Fresh cucumbers, cherry tomatoes, and Dungan peppers, perfectly marinated, create a vibrant and flavorful dish. Order now and enjoy the rich taste'
				},
				active: true,
				iiko_id: '6ee17d35-667b-4261-94eb-bc760ae76bf8',
				jowi_id: '79add589-4564-4c17-94b5-a00d2b76106f',
				discounts: null,
				rating: 0,
				weight: 250,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '7bfd270a-9cf6-4c99-b6b7-042e1e2d3b75',
				slug: 'svezhij-18-d-3nvkj1lnufz9s4',
				out_price: 21500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: '90d3c9fa-6038-4471-8cb2-c0bfbe92b241',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Barra assorti',
					ru: 'Свежее ассорти',
					en: 'Fresh assortment'
				},
				description: {
					uz: "Bizning yangi assortimentimizni tatib ko'ring! Yashil piyoz, pomidor, bodring, turp, o'tlar va bulg'or qalampiri vitaminlar bilan to'la engil va qarsillab taom yaratadi. Hoziroq buyurtma bering va tabiiy ingredientlarning yangiligidan bahramand bo'ling",
					ru: 'Попробуйте наше свежее ассорти! Зеленый лук, помидоры, огурцы, редиска, зелень и болгарский перец создают легкое и хрустящее блюдо, полное витаминов. Закажите сейчас и наслаждайтесь свежестью натуральных ингредиентов',
					en: 'Try our fresh assortment! Green onions, tomatoes, cucumbers, radishes, herbs and bell peppers create a light and crunchy dish full of vitamins. Order now and enjoy the freshness of natural ingredients'
				},
				active: true,
				iiko_id: 'c28bc1d1-aea9-430b-ad20-f2737e08e2d8',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 500,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'ec37b939-158b-4484-a502-e1b582ce4e70',
				slug: 'suzma-d-3nvkj1lnufz9s5',
				out_price: 9500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: '132a40be-84b8-4655-add2-8e532d6f902b',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Suzma',
					ru: 'Сузма ',
					en: 'Suzma'
				},
				description: {
					uz: "Nozik va qaymoqli suzma mukammal ta'm va tuzilma uyg'unligini yaratadi. Ushbu tetiklashtiruvchi va foydali salat har qanday dasturxonga ajoyib qo'shimcha bo'ladi.",
					ru: 'Нежная и кремовая сузьма создает идеальное сочетание вкусов и текстур. Этот освежающий и полезный салат станет отличным дополнением к любому столу',
					en: 'Delicate and creamy suzma creates the perfect combination of flavors and textures. This refreshing and healthy salad is a great addition to any table.'
				},
				active: true,
				iiko_id: '2a854924-019a-41a2-a1ba-26732f078ea3',
				jowi_id: 'd09b1855-9a13-4eda-91c4-020dfc1bc3a5',
				discounts: null,
				rating: 0,
				weight: 200,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '701f080c-fbef-4a93-a660-3085e070614e',
				slug: 'tomat-sok-d-3nvkj1lnufz9s7',
				out_price: 9500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: '04957f03-808d-42b3-bc7d-5d89f0eb1641',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Tomat sharbati',
					ru: 'Томатный сок',
					en: 'Tomato juice'
				},
				description: {
					uz: "Marinadlangan pomidorlardan tayyorlangan tomat sharbatimizni tatib ko‘ring! Bu boy va tetiklashtiruvchi ichimlik yorqin ta'm va hidga ega bo‘lib, pomidorlarning barcha foydali xususiyatlarini saqlaydi. Hozir buyurtma qiling va tabiiy ta'midan rohatlaning",
					ru: 'Попробуйте наш томатный сок из маринованных помидоров! Этот насыщенный и освежающий напиток обладает ярким вкусом и ароматом, сохраняя все полезные свойства томатов. Закажите сейчас и наслаждайтесь натуральным вкусом',
					en: 'Try our tomato juice made from pickled tomatoes! This rich and refreshing drink has a vibrant taste and aroma, retaining all the beneficial properties of tomatoes. Order now and enjoy the natural flavor'
				},
				active: true,
				iiko_id: 'e69ff63b-b4e3-4843-ac43-6796037e1f3e',
				jowi_id: '0249efca-1ffa-4ce6-9bb0-539c1a6484af',
				discounts: null,
				rating: 0,
				weight: 200,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '00706a1a-0ab1-47b2-ab9b-decdbd2e6ab3',
				slug: 'chimchi-d-3nvkj1lnufz9sb',
				out_price: 9500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: '372433ae-79d5-4ca2-9c18-c6090ef12bf5',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Чимчи ',
					ru: 'Чимчи ',
					en: 'Чимчи '
				},
				description: {
					uz: '',
					ru: '',
					en: ''
				},
				active: true,
				iiko_id: '7d3d38e1-482f-4777-9e38-6d80281d6613',
				jowi_id: '3c7c9884-d367-11e8-a75b-67fa706a483d',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '71b86a2b-e54f-4790-b4ce-df2e6fdb8b79',
				slug: 'chirokchi-d-3nvkj1lnufz9sc',
				out_price: 20000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: '6ad2c51f-35e3-430c-9a78-0ed9a29c2a85',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Chiroqchi',
					ru: 'Чирокчи ',
					en: 'Chiroqchi'
				},
				description: {
					uz: 'Chiroqchi salatini tatib ko‘ring! Bu salat yangi sabzavotlar, xushbo‘y ziravorlar, nozik ko‘katlar va suzmani o‘z ichiga oladi, yorqin va tetiklashtiruvchi taom yaratadi. Hozir buyurtma qiling va haqiqiy o‘zbek ta’midan rohatlaning!',
					ru: 'Попробуйте наш салат Чирокчи! Этот салат включает в себя свежие овощи, ароматные специи, нежную зелень и сузьму, создавая яркое и освежающее блюдо. Закажите сейчас и насладитесь истинным вкусом узбекской кухни',
					en: 'Try our Chiroqchi salad! This salad includes fresh vegetables, aromatic spices, delicate greens, and suzma, creating a vibrant and refreshing dish. Order now and enjoy the true taste of Uzbek cuisine!'
				},
				active: true,
				iiko_id: '6a28d405-ac21-4b52-abca-80c380df6e1c',
				jowi_id: 'f9d620bd-fade-4f9a-a94c-1f0728a4282b',
				discounts: null,
				rating: 0,
				weight: 350,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '8b382c69-8371-432b-859b-b49ef5c91c2b',
				slug: 'solenyj-405h0e1l9mtvz4z',
				out_price: 15500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: 'c9d169f5-fd5c-48a4-a3b5-f0300ae1606d',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Tuzlama assortisi',
					ru: 'Соленый ассорти',
					en: 'Salty assorted'
				},
				description: {
					uz: "Bir martali ishlatiladigan idishlar uchun 1,500 so'm qo'shiladi.",
					ru: 'Стоимость прибавится 1.500 сум за одноразовую посуду.',
					en: 'The cost will be added 1,500 soums for disposable tableware.'
				},
				active: true,
				iiko_id: 'e992617c-8a8c-4584-8eba-33fb77d61a62',
				jowi_id: '583ca0fa-1d0b-11ec-960d-ab7f0a4fdc6f',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '42600b3c-d565-4d07-bd85-77c673c75106',
				slug: 'radish',
				out_price: 8500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: '71161a36-992b-4b2a-9e48-8b33fed7c9f8',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Turp',
					ru: 'Редис',
					en: 'Radish'
				},
				description: {
					uz: " Bir martali ishlatiladigan idishlar uchun 1,500 so'm qo'shiladi.",
					ru: 'Стоимость прибавится 1.500 сум за одноразовую посуду.',
					en: 'The cost will be added 1,500 soums for disposable tableware.'
				},
				active: true,
				iiko_id: 'e1f58ba6-fd63-496f-94bf-8bdeda736c68',
				jowi_id: 'e565e2ae-25dd-11ec-b419-7b46a0599e06',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '94f3a283-19c8-442b-b5eb-7485b4b58b79',
				slug: 'tomatnyj-assorti-405h0e1l9mtyiw0',
				out_price: 20500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: 'b67f5b43-e3fc-4bfe-9658-0a3ec7355619',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Tomatli assorti',
					ru: 'Томатное ассорти',
					en: 'Tomato platter'
				},
				description: {
					uz: 'Marinovka qilingan pomidorlar, bodring va tomat sharbatining uyg‘unligi yorqin va tetiklashtiruvchi taom yaratadi. Bu salat vitaminlarga boy va oshlar uchun mukammal zakuska.',
					ru: 'Сочетание маринованных помидоров, огурцов и томатного сока создаёт яркое и освежающее блюдо. Этот салат полон витаминов и идеально подходит для закуски плова',
					en: 'The combination of pickled tomatoes, cucumbers, and tomato juice creates a vibrant and refreshing dish. This salad is full of vitamins and perfect as a side dish for plov.'
				},
				active: true,
				iiko_id: 'b91e610e-68d0-477f-9ad9-f19cc0eef837',
				jowi_id: '83bb41f9-22ef-4703-afe8-7b25d22c462f',
				discounts: null,
				rating: 0,
				weight: 250,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'cf3a09e8-fa9a-40eb-9135-6b8d9c40616f',
				slug: 'anzur-piez-405h0e1l9mtzkr7',
				out_price: 8000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['637cb809-cc1f-45e6-a22f-c28c2e36d6d5'],
				brand_id: '',
				rate_id: '',
				image: '7a170a2d-3dac-44c9-be64-332e0b0c126c',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Anzur piyozi',
					ru: 'Лук анзур',
					en: 'Onion anzur'
				},
				description: {
					uz: "Ushbu noyob ingredient, o‘ziga xos yangiligi va achchiqligi bilan, har qanday taomga maxsus ta'm va hid qo‘shadi. Anzur piyoz nafaqat mazali, balki vitaminlarga boydir.",
					ru: 'Этот уникальный ингредиент, сочетающий в себе свежесть и пикантность, добавляет особый вкус и аромат любому блюду. Анзур лук не только вкусен, но и богат витаминами',
					en: 'This unique ingredient, combining freshness and piquancy, adds a special taste and aroma to any dish. Anzur onion is not only delicious but also rich in vitamins.'
				},
				active: true,
				iiko_id: 'a0b253ca-befe-42cf-9e8c-dfd46a9c2fe6',
				jowi_id: '112ff90c-9282-4e23-9f0a-77569f881870',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			}
		],
		child_categories: null,
		seo_text: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_h1: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_title: {
			uz: '',
			ru: '',
			en: ''
		}
	},
	{
		id: '9faa3f87-4249-43de-97ad-cd189f89207a',
		slug: 'supplements-8nu4ob1ldxfeq6d',
		parent_id: '',
		image: 'd14b7d7e-4b9e-403d-8bcb-e561766cdcc6',
		description: {
			uz: '',
			ru: '',
			en: ''
		},
		title: {
			uz: "Qo'shimchalar",
			ru: 'Добавки ',
			en: 'Supplements'
		},
		order_no: '5',
		active: true,
		products: [
			{
				id: '1e603a3f-eb88-41b9-9d91-c620dfb6294e',
				slug: '2-hissa-gusht-d-3nvkj1lnufz9pz',
				out_price: 18000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['9faa3f87-4249-43de-97ad-cd189f89207a'],
				brand_id: '',
				rate_id: '',
				image: '5eefd1b2-7409-467b-824b-67c7459104b5',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Qo'shimcha go'sht",
					ru: 'Дополнительное мясо',
					en: 'Extra meat'
				},
				description: {
					uz: "  Qo'y va mol go'shti\n",
					ru: 'Мясо говядины и баранины',
					en: ' Beef and lamb\n'
				},
				active: true,
				iiko_id: '9b9c2644-007d-4f48-9335-3c17803b21e5',
				jowi_id: '44424b99-4896-4f4e-b89d-5ebc37c93e50',
				discounts: null,
				rating: 0,
				weight: 100,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'e8de6e8c-0b4d-4c97-a530-dbe14bcb5cad',
				slug: 'bedana-tuhum-d-3nvkj1lnufz9q0',
				out_price: 2000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['9faa3f87-4249-43de-97ad-cd189f89207a'],
				brand_id: '',
				rate_id: '',
				image: '10f85b3a-a794-4a9e-bacc-0ff14ae42ae1',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Bedana tuxum',
					ru: 'Перепелиные яйца',
					en: 'Quail eggs'
				},
				description: {
					uz: 'Bedana tuxum',
					ru: 'Простая, но сытная добавка, которая может быть использована во множестве рецептов',
					en: 'Quail eggs\n'
				},
				active: true,
				iiko_id: 'cbe8475e-8f39-44e3-93d8-6d2b939de1b8',
				jowi_id: '68cd3459-d440-43ca-b667-b88e296cf8bb',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'f77a7554-3919-474e-a1d2-62b2f38bb939',
				slug: 'kazy-d-3nvkj1lnufz9q1',
				out_price: 10000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['9faa3f87-4249-43de-97ad-cd189f89207a'],
				brand_id: '',
				rate_id: '',
				image: 'ca8f9bc1-8325-462c-8894-f98151ff4ca6',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Qazi',
					ru: 'Казы',
					en: 'Qazi'
				},
				description: {
					uz: 'Ushbu an’anaviy delikates qadimiy retseptlar asosida tayyorlangan ot kolbasasidan iborat bo‘lib, boy ta’m va hid bilan sizni xursand qiladi. Har bir bo‘lak qazi Sharqning haqiqiy ta’mi bilan to‘la.',
					ru: 'Этот традиционный деликатес из конской колбасы, приготовленный по древним рецептам, порадует вас насыщенным вкусом и ароматом. Каждый кусочек казы наполнен истинным вкусом Востока (1 шт.)',
					en: 'This traditional delicacy made from horse sausage, prepared according to ancient recipes, will delight you with its rich taste and aroma. Every slice of kazi is filled with the true flavor of the East.'
				},
				active: true,
				iiko_id: 'bf7dfc92-0b2a-4692-83f0-344fb925921b',
				jowi_id: 'e4dc3677-ff9c-4911-8747-d7cba4346481',
				discounts: null,
				rating: 0,
				weight: 22,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'a91f351a-cb9e-4f75-8c49-c79d7e9baa90',
				slug: 'tok-dolma-d-3nvkj1lnufz9q3',
				out_price: 2500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['9faa3f87-4249-43de-97ad-cd189f89207a'],
				brand_id: '',
				rate_id: '',
				image: 'd1bd76ef-ba1d-4de2-b9d6-1a10f4bebd91',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Do'lma",
					ru: 'Дулма',
					en: 'Dolma'
				},
				description: {
					uz: 'Ushbu an’anaviy delikates uzum barglariga o‘ralgan mayin go‘sht va xushbo‘y ziravorlar bilan to‘ldirilgan bo‘lib, sizga haqiqiy rohat bag‘ishlaydi. Har bir bo‘lak dulma Sharqning boy ta’mi va hidiga to‘la.',
					ru: 'Этот традиционный деликатес из виноградных листьев, фаршированных нежным мясом и ароматными специями, подарит вам истинное наслаждение. Каждый кусочек дулмы наполнен богатым вкусом и ароматом Востока (1 шт.)',
					en: 'This traditional delicacy made from grape leaves stuffed with tender meat and aromatic spices will provide you with true pleasure. Every bite of dolma is filled with the rich taste and aroma of the East.'
				},
				active: true,
				iiko_id: '74282661-f28e-4a5a-aef3-5437d3698412',
				jowi_id: '14131f44-bfdf-11e8-b91d-fbb5b2303f3c',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '0bde9805-1eaf-4484-9a02-a2e708b30113',
				slug: 'garimdori-405h0e1l9mu49el',
				out_price: 2000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['9faa3f87-4249-43de-97ad-cd189f89207a'],
				brand_id: '',
				rate_id: '',
				image: '7927d93d-8585-48e7-a691-6b41894c1129',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Garimdori',
					ru: 'Перец',
					en: 'Pepper'
				},
				description: {
					uz: '',
					ru: ' Популярная, острая добавка, которая добавляет пикантность и характер в различные блюдо',
					en: ''
				},
				active: true,
				iiko_id: 'c747c92e-fff9-4040-976b-f6a759717dce',
				jowi_id: 'adbf910c-d864-11e8-952d-c74c78be3244',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			}
		],
		child_categories: null,
		seo_text: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_h1: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_title: {
			uz: '',
			ru: '',
			en: ''
		}
	},
	{
		id: '51414356-4a72-463a-bc7c-82f02bf12a2a',
		slug: 'bread',
		parent_id: '',
		image: '',
		description: {
			uz: '',
			ru: '',
			en: ''
		},
		title: {
			uz: 'Nonlar',
			ru: 'Хлеб',
			en: 'Bread'
		},
		order_no: '6',
		active: true,
		products: [
			{
				id: '12bf76df-02f5-48b5-a9c3-2544ebf5a39c',
				slug: 'non-d-3nvkj1lnufz9rg',
				out_price: 7000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['51414356-4a72-463a-bc7c-82f02bf12a2a'],
				brand_id: '',
				rate_id: '',
				image: '3efb96fe-6d30-497f-b172-3bb1f92161cc',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Non',
					ru: 'Лепешка.',
					en: 'Лепешка '
				},
				description: {
					uz: 'Узбекская лепешка — хрустящий, ароматный хлеб, символ гостеприимства и семейных традиций.',
					ru: 'Узбекская лепешка — хрустящий, ароматный хлеб, символ гостеприимства и семейных традиций',
					en: 'Узбекская лепешка — хрустящий, ароматный хлеб, символ гостеприимства и семейных традиций.'
				},
				active: true,
				iiko_id: 'faa9f12f-e917-4e9d-9576-d4d6362949cb',
				jowi_id: '9dc4d44e-bfe9-11e8-a3ea-1f4934810336',
				discounts: null,
				rating: 0,
				weight: 250,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '2ef086fd-00a1-4f59-bd93-67fbf8d67876',
				slug: 'non-05-d-3nvkj1lnufz9rf',
				out_price: 3500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['51414356-4a72-463a-bc7c-82f02bf12a2a'],
				brand_id: '',
				rate_id: '',
				image: '26ffa81b-92dc-4348-9287-0d8f4efdbfb5',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Non ',
					ru: 'Лепешка 0.5',
					en: 'Лепешка '
				},
				description: {
					uz: 'Узбекская лепешка — хрустящий, ароматный хлеб, символ гостеприимства и семейных традиций',
					ru: 'Узбекская лепешка — хрустящий, ароматный хлеб, символ гостеприимства и семейных традиций',
					en: 'Узбекская лепешка — хрустящий, ароматный хлеб, символ гостеприимства и семейных традиций'
				},
				active: true,
				iiko_id: 'd681c1e4-4dfc-4042-877e-bfc9d682f457',
				jowi_id: 'a3e05132-bfe9-11e8-bff6-bbc98ed742a8',
				discounts: null,
				rating: 0,
				weight: 125,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '0e541df5-2058-4828-ab00-6f48963ac08c',
				slug: 'katlama-patir-402wel1l9o16a6r',
				out_price: 10000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['51414356-4a72-463a-bc7c-82f02bf12a2a'],
				brand_id: '',
				rate_id: '',
				image: 'c3ed92a0-9d13-447a-9344-1c11cc3edb9c',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Qatlama patir',
					ru: 'Катлама патир',
					en: 'Катлама патир'
				},
				description: {
					uz: '',
					ru: '',
					en: ''
				},
				active: true,
				iiko_id: '5baae56c-fc11-4830-9d46-ff54b60a9d7c',
				jowi_id: '14a9fc9a-0df1-11eb-b724-bb7528392560',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			}
		],
		child_categories: null,
		seo_text: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_h1: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_title: {
			uz: '',
			ru: '',
			en: ''
		}
	},
	{
		id: '5eff4883-8f7c-44e5-9e51-6e5db9bd6722',
		slug: 'drinks-8nu4ob1ldxfasxk',
		parent_id: '',
		image: 'd9aa3082-ae9b-4fe2-80f7-9e510e552b40',
		description: {
			uz: '',
			ru: '',
			en: ''
		},
		title: {
			uz: 'Ichimliklar',
			ru: 'Напитки ',
			en: 'Drinks'
		},
		order_no: '7',
		active: true,
		products: [
			{
				id: '9c79f4b1-6aa4-4f61-8783-109b1e2bd4b7',
				slug: 'cherry-compote',
				out_price: 15500,
				currency: 'UZS',
				string: '',
				type: 'origin',
				categories: ['5eff4883-8f7c-44e5-9e51-6e5db9bd6722'],
				brand_id: '',
				rate_id: '',
				image: 'df3d53a4-a2ad-4f88-bfc7-c36e74844350',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Sharbat',
					ru: 'Компот',
					en: 'Cherry compote '
				},
				description: {
					uz: 'Bu xushbo‘y ichimlik shirali olchadan tayyorlanib, sizga haqiqiy yoz ta’mini tuhfa etadi. Har bir qultumdagi yangilik va tabiiy shirinlik uni dasturxoningizga ajoyib qo‘shimcha qiladi',
					ru: 'Этот ароматный напиток из сочной черешни подарит вам настоящий вкус лета. Свежесть и натуральная сладость в каждом глотке сделают его идеальным дополнением к вашему столу',
					en: 'This aromatic drink made from juicy cherries brings you the true taste of summer. The freshness and natural sweetness in every sip make it a perfect addition to your table.'
				},
				active: true,
				iiko_id: '79a85764-2568-46ea-b6ed-41f4c8eefe13',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '22207e9d-68ff-4521-b945-d30c64fb19b1',
				slug: 'borjomi',
				out_price: 17000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['5eff4883-8f7c-44e5-9e51-6e5db9bd6722'],
				brand_id: '',
				rate_id: '',
				image: '30ca7e0c-b44a-49bf-9a5b-f280d86ea1ce',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Borjomi',
					ru: 'Borjomi',
					en: 'Borjomi'
				},
				description: {
					uz: "Gruziyaning yuragidan noyob mineral suv bo'lgan Borjomining tabiiy pokligi va jonlantiruvchi kuchini kashf eting. O'zining ko'pikli ta'siri va boy mineral tarkibi bilan mashhur bo'lgan Borjomi har bir qultum bilan tetiklashtiradi va energiya beradi",
					ru: 'Откройте для себя природную чистоту и оживляющую силу Боржоми, уникальной минеральной воды из самого сердца Грузии. Известная своим игристым эффектом и богатым минеральным составом, Боржоми освежит и наполнит энергией с каждым глотком',
					en: 'Discover the natural purity and revitalizing power of Borjomi, a unique mineral water from the very heart of Georgia. Known for its sparkling effect and rich mineral composition, Borjomi refreshes and energizes with every sip'
				},
				active: true,
				iiko_id: '1ff2b70d-cac9-4510-b8c3-da900ea0ebe0',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '837d7ce7-b9b6-4136-857f-b2924064a743',
				slug: 'ayran',
				out_price: 31500,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['5eff4883-8f7c-44e5-9e51-6e5db9bd6722'],
				brand_id: '',
				rate_id: '',
				image: 'ed32bfdc-9826-4223-bbef-8d3d07def217',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Ayron',
					ru: 'Айран',
					en: 'Ayran'
				},
				description: {
					uz: "Bizning ayronimizning tetiklashtiruvchi va haqiqiy ta'mini kashf eting, bu silliq tuzilishi va yumshoq nordonligi bilan e'tirof etilgan an'anaviy achitilgan sutli ichimlik",
					ru: 'Откройте для себя освежающий и аутентичный вкус нашего Айрана, традиционного кисломолочного напитка, который ценят за его гладкую текстуру и легкую кислинку. Приготовленный из молока высшего качества с щепоткой соли, наш Айран предлагает идеальный баланс питательных веществ и увлажнения, делая его идеальным выбором для здорового образа жизни',
					en: 'Discover the refreshing and authentic taste of our Ayran, a traditional fermented dairy drink cherished for its smooth texture and mild tanginess. Made from the finest quality milk and a pinch of salt, our Ayran offers a perfect balance of nutrients and hydration, making it an ideal choice for a healthy lifestyle. Enjoy it as a cooling beverage during warm days or as a complement to your favorite meals, bringing a touch of Eastern tradition to your table.'
				},
				active: true,
				iiko_id: 'bcc3bcd3-6cb0-408b-af5a-6d7ca8f4d5f2',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '3efc0266-83da-4e37-9239-d6b224475efd',
				slug: 'coca-cola',
				out_price: 8000,
				currency: 'UZS',
				string: '',
				type: 'origin',
				categories: ['5eff4883-8f7c-44e5-9e51-6e5db9bd6722'],
				brand_id: '',
				rate_id: '',
				image: '9ee36d5a-80c6-4f1c-a6af-34bc48c8bff2',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Coca-cola',
					ru: 'Coca-Cola',
					en: 'Coca - Cola'
				},
				description: {
					uz: 'Coca-Colani tatib ko‘ring — butun dunyo bo‘ylab sevimli ichimlik! Uning o‘ziga xos tetiklashtiruvchi ta’mi va pufakchalari Coca-Colani har qanday vaziyatga mos qiladi.',
					ru: 'Попробуйте Coca-Cola — культовый напиток, любимый во всем мире! С его уникальным освежающим вкусом и искрящейся газировкой Coca-Cola идеально подходит для любого случая',
					en: 'Try Coca-Cola — the iconic drink loved worldwide! With its unique refreshing taste and sparkling bubbles, Coca-Cola is perfect for any occasion.'
				},
				active: true,
				iiko_id: 'f3d696c5-d230-41eb-9324-0e9023277bc9',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 500,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: 'bc1de325-67c3-4051-8565-af9c5cbc1527',
				slug: 'fanta-405h0e1l9mus66g',
				out_price: 8000,
				currency: 'UZS',
				string: '',
				type: 'origin',
				categories: ['5eff4883-8f7c-44e5-9e51-6e5db9bd6722'],
				brand_id: '',
				rate_id: '',
				image: 'c866b940-5104-4ef2-8fe0-a3cf0a73d902',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Fanta',
					ru: 'Fanta',
					en: 'Fanta'
				},
				description: {
					uz: 'Bu gazlangan ichimlik quvonch va zavqqa to‘la, chanqovni mukammal qondiradi va har bir qultumda zavq bag‘ishlaydi.',
					ru: 'Этот газированный напиток полон веселья и радости, идеально утоляет жажду и приносит наслаждение в каждом глотке.',
					en: 'This carbonated beverage is full of fun and joy, perfectly quenches your thirst, and provides delight in every sip.'
				},
				active: true,
				iiko_id: '',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '49f6d834-d998-4a9f-a728-7df0172c6dda',
				slug: 'chortok-405h0e1l9muwj3a',
				out_price: 8000,
				currency: 'UZS',
				string: '',
				type: 'origin',
				categories: ['5eff4883-8f7c-44e5-9e51-6e5db9bd6722'],
				brand_id: '',
				rate_id: '',
				image: 'dfa340bb-e884-4a83-8e87-16152268d3fc',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Chortok',
					ru: 'Чорток',
					en: 'Chortok'
				},
				description: {
					uz: 'Chortoq buloq suvini tatib ko‘ring! Bu tabiiy manbalardan olingan tetiklashtiruvchi ichimlik toza va jonlantiruvchi ta’mga ega bo‘lib, chanqovni mukammal qondiradi.',
					ru: 'Попробуйте рудниковую газированную воду Чорток! Этот освежающий напиток из природных источников обладает чистым и бодрящим вкусом, который идеально утоляет жажду. ',
					en: 'Try Chortoq spring carbonated water! This refreshing drink from natural sources has a pure and invigorating taste that perfectly quenches your thirst.'
				},
				active: true,
				iiko_id: '',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '5e4adc4c-ac45-4d26-bf95-d517c6cc4602',
				slug: 'gazli-gazsiz-suv-405h0e1l9muzxtm',
				out_price: 3000,
				currency: 'UZS',
				string: '',
				type: 'origin',
				categories: ['5eff4883-8f7c-44e5-9e51-6e5db9bd6722'],
				brand_id: '',
				rate_id: '',
				image: '038ac721-aee4-44e6-80fc-fcff51d78e67',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Suv gazli/gazsiz',
					ru: 'Вода с газом/без',
					en: 'Water with/without gas'
				},
				description: {
					uz: '',
					ru: '',
					en: ''
				},
				active: true,
				iiko_id: 'b1b299b7-2dbe-48fa-be89-3bddd5623710',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			}
		],
		child_categories: null,
		seo_text: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_h1: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_title: {
			uz: '',
			ru: '',
			en: ''
		}
	},
	{
		id: '835ad6fe-d872-4052-a46c-c0e91bc0f08f',
		slug: 'sets',
		parent_id: '',
		image: '8d611d62-4e21-4c07-9020-497cf99b0241',
		description: {
			uz: '',
			ru: '',
			en: ''
		},
		title: {
			uz: 'Setlar',
			ru: 'Сеты',
			en: 'Sets'
		},
		order_no: '41',
		active: true,
		products: [
			{
				id: '16929de3-eedd-465b-9ce1-355c2a8b9190',
				slug: 'ramadan-set-1',
				out_price: 190000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['835ad6fe-d872-4052-a46c-c0e91bc0f08f'],
				brand_id: '',
				rate_id: '',
				image: '90fa56ad-d2f0-47d4-9e86-f39bac740341',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: 'Ramazon set 1',
					ru: 'Рамазон сет 1',
					en: 'Ramadan set 1'
				},
				description: {
					uz: "To'plam quyidagilarni o'z ichiga oladi: 3 ta to'y oshi, achichuk salati 1 ta portsiya, bahor salati 1 ta portsiya, tomatli assorti 1 ta portsiya, 2 ta yopgan non va 3 ta 0.5L Borjomi mineral suvi.",
					ru: 'Сет содержит: 3 порции свадебного плова, ачичук салат 1 порция, весенний салат 1 порция, томатный ассорти 1 порция, 2 лепешки и 3 по 0.33L минеральная вода Borjomi.',
					en: 'The set contains: 3 servings of wedding pilaf, 1 serving of achichuk salad, 1 serving of spring salad, 1 serving of assorted tomatoes, 2 tortillas and 3 0.5L Borjomi mineral water.'
				},
				active: true,
				iiko_id: 'b1290f85-60c4-41d0-a326-0b0b5cda3aa9',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			},
			{
				id: '508bfe25-b5fa-4b74-8979-38064dc0dc4c',
				slug: 'ramadan-set-2',
				out_price: 300000,
				currency: 'UZS',
				string: '',
				type: 'simple',
				categories: ['835ad6fe-d872-4052-a46c-c0e91bc0f08f'],
				brand_id: '',
				rate_id: '',
				image: '97a49f5c-1efe-49d3-a587-17dc32784658',
				active_in_menu: false,
				has_modifier: false,
				from_time: '',
				to_time: '',
				off_always: false,
				gallery: null,
				title: {
					uz: "Ramazon to'plami 2",
					ru: 'Рамазан сет 2',
					en: 'Ramadan set 2'
				},
				description: {
					uz: "To'plamda quyidagilar mavjud: 5 ta to'y oshi, 2 ta bahor salati, 1 ta tomatli assorti, 1 ta achichuk salati, 4 ta yopgan non va 4 ta 0.5L Borjomi mineral suvi",
					ru: 'Сет содержит: 5 порции свадебного плова, 2 порции весеннего салата, 1 порцию томатного ассорти, 1 порция салата ачичук, 4 лепешки и 4 штуки по 0.33L минеральной воды Borjomi',
					en: 'The set contains: 5 servings of wedding pilaf, 2 servings of spring salad, 1 serving of assorted tomatoes, 1 serving of achichuk salad, 4 tortillas and 4 pieces of 0.5Liters of Borjomi mineral water'
				},
				active: true,
				iiko_id: 'f8887f76-b252-4bbc-b710-4a5fe9624e54',
				jowi_id: '',
				discounts: null,
				rating: 0,
				weight: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				energy: 0,
				seo_text: {
					uz: '',
					ru: '',
					en: ''
				}
			}
		],
		child_categories: null,
		seo_text: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_h1: {
			uz: '',
			ru: '',
			en: ''
		},
		metatag_title: {
			uz: '',
			ru: '',
			en: ''
		}
	}
];
