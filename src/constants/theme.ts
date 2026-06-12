const bgMain: string = "#202123";
const bgCard: string = "#2d2d2d";
const borderColor: string = "#3e3f4b";

const primary: string = "#3b82f6";
const primaryHover: string = "#2563eb";
const primaryDisabled: string = "#374152"

const textMain: string = "#ececf1";
const textMuted: string = "#c5c5d2";

const textSuccess: string = "#2e7d32";
const textWarning: string = "#b76e00";
const textError: string = "#c62828";
const textInfo: string = "#0b4364";

const progressBgColor: string = "#3b82f6";

const menu = {
  bg: "#1e1e1f",
  text: "#9999a1",
  textHover: "#ececf1", //Cuando el mouse hace hover
  bgHover: "#2d2d2e", //FOndo cuando el mouse hace hover
  activeText: "#ffffff", //Cuando se selecciona uno
  activeBg: "#343541", //Fondo cuando uno este selecioonado
  access: "#3b82f6",
};

//Badges
const badges: { [key: string]: any } = {
  active: {
    iconColor: "#4ad380",
    backgroundColor: "#14532d",
  },
  inactive: {
    iconColor: "#f87171",
    backgroundColor: "#7f1d1d",
  },
  maintenance: {
    iconColor: "#fbbf24",
    backgroundColor: "#78570f",
  },
};

export const theme = {
  bgMain,
  bgCard,
  borderColor,
  primary,
  primaryHover,
  primaryDisabled,
  textMain,
  textMuted,
  textSuccess,
  textWarning,
  textError,
  textInfo,
  progressBgColor,

  menu,
  badges,
};
