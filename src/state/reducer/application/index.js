import { ApplicationActionTypes } from "../../action";

const defaultState = { 
	user: null,
	"genres": [
        {
            "slug": "action",
            "name": "Екшн"
        },
        {
            "slug": "adventure",
            "name": "Пригоди"
        },
        {
            "slug": "cars",
            "name": "Автівки"
        },
        {
            "slug": "comedy",
            "name": "Комедія"
        },
        {
            "slug": "dementia",
            "name": "Деменція"
        },
        {
            "slug": "demons",
            "name": "Демони"
        },
        {
            "slug": "drama",
            "name": "Драма"
        },
        {
            "slug": "ecchi",
            "name": "Еччі"
        },
        {
            "slug": "fantasy",
            "name": "Фентезі"
        },
        {
            "slug": "game",
            "name": "Ігри"
        },
        {
            "slug": "harem",
            "name": "Гарем"
        },
        {
            "slug": "hentai",
            "name": "Хентий"
        },
        {
            "slug": "historical",
            "name": "Історичне"
        },
        {
            "slug": "horror",
            "name": "Хоррор"
        },
        {
            "slug": "josei",
            "name": "Дзьосей"
        },
        {
            "slug": "kids",
            "name": "Діти"
        },
        {
            "slug": "magic",
            "name": "Магія"
        },
        {
            "slug": "martial_arts",
            "name": "Бойові мистецтва"
        },
        {
            "slug": "mecha",
            "name": "Мехи"
        },
        {
            "slug": "military",
            "name": "Військове"
        },
        {
            "slug": "music",
            "name": "Музика"
        },
        {
            "slug": "mystery",
            "name": "Таємниця"
        },
        {
            "slug": "parody",
            "name": "Пародія"
        },
        {
            "slug": "police",
            "name": "Поліцій"
        },
        {
            "slug": "psychological",
            "name": "Психологічне"
        },
        {
            "slug": "romance",
            "name": "Романтика"
        },
        {
            "slug": "samurai",
            "name": "Самураї"
        },
        {
            "slug": "school",
            "name": "Школа"
        },
        {
            "slug": "sci_fi",
            "name": "Наукова фантастика"
        },
        {
            "slug": "seinen",
            "name": "Сейнен"
        },
        {
            "slug": "shoujo",
            "name": "Сьодзьо"
        },
        {
            "slug": "shoujo_ai",
            "name": "Сьодзьо-ай"
        },
        {
            "slug": "shounen",
            "name": "Сьонен"
        },
        {
            "slug": "shounen_ai",
            "name": "Сьонен-ай"
        },
        {
            "slug": "slice_of_life",
            "name": "Буденність"
        },
        {
            "slug": "space",
            "name": "Космос"
        },
        {
            "slug": "sports",
            "name": "Спорт"
        },
        {
            "slug": "superpower",
            "name": "Суперсила"
        },
        {
            "slug": "supernatural",
            "name": "Надприроднє"
        },
        {
            "slug": "thriller",
            "name": "Триллер"
        },
        {
            "slug": "vampire",
            "name": "Вампіри"
        },
        {
            "slug": "yaoi",
            "name": "Яой"
        },
        {
            "slug": "yuri",
            "name": "Юрі"
        }
    ],
    "categories": [
        {
            "slug": "tv",
            "name": "TV Серіал"
        },
        {
            "slug": "movie",
            "name": "Фільм"
        },
        {
            "slug": "special",
            "name": "Спешл"
        },
        {
            "slug": "ova",
            "name": "OVA"
        },
        {
            "slug": "ona",
            "name": "ONA"
        }
    ],
    "states": [
        {
            "slug": "ongoing",
            "name": "Онгоїнг"
        },
        {
            "slug": "released",
            "name": "Завершений"
        },
        {
            "slug": "announced",
            "name": "Анонс"
        }
    ],
    "statuses": [
        {
            "slug": "active",
            "name": "Дивлюсь"
        },
        {
            "slug": "finished",
            "name": "Закінчено"
        },
        {
            "slug": "hold",
            "name": "Відкладено"
        },
        {
            "slug": "dropped",
            "name": "Кинуто"
        },
        {
            "slug": "planned",
            "name": "Заплановано"
        }
    ],
	minYear: 2000,
	isAuthenticated: localStorage.token == null ? false : true,
	loginUser: null,
	joinUser: null
};

const application = (state = defaultState, action) => {
	switch (action.type) {
		case ApplicationActionTypes.JOIN_USER_SUCCESS:
			return Object.assign({}, state, {joinUser: 2});
		case ApplicationActionTypes.JOIN_USER_ERROR:
			return Object.assign({}, state, {joinUser: 1});
		case ApplicationActionTypes.JOIN_USER_REQUEST:
			return Object.assign({}, state, {joinUser: 0});
		case ApplicationActionTypes.LOGIN_USER_SUCCESS:
			return Object.assign({}, state, {user: action.payload, loginUser: 2, isAuthenticated: true});
		case ApplicationActionTypes.LOGIN_USER_ERROR:
			return Object.assign({}, state, {loginUser: 1, isAuthenticated: false});
		case ApplicationActionTypes.LOGIN_USER_REQUEST:
			return Object.assign({}, state, {loginUser: 0, isAuthenticated: false});
		case ApplicationActionTypes.LOGOUT_USER_SUCCESS:
			return Object.assign({}, defaultState, {isAuthenticated: false});
        case ApplicationActionTypes.RESET_STATUSES:
            return Object.assign({}, state, {loginUser: null, joinUser: null});
		default:
			return state;
	}
};

export default application;
