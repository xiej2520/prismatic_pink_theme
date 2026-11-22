export const hue = {
	// accent pink (with a darker fill for white text), keyword pink and macro pink.
	pink: "#FF1277", // accent
	deepPink: "#DA005F", // accent fill behind white text
	softPink: "#F85EB4", // keywords
	hotPink: "#FF2884", // macros

	green: "#31A155",
	brightGreen: "#3FC56B",

	blue: "#018ACC",
	skyBlue: "#09A1ED",
	brightBlue: "#10B1FE",
	paleBlue: "#978CCD",

	orange: "#E17615",
	yellow: "#F9C859",
	gold: "#FFC104",
	limeYellow: "#CCD00C",
	coral: "#FF6B66",

	purple: "#D177F5",
	magenta: "#C75AF3",
	rose: "#B58E95",

	teal: "#15C9C5",
	darkTeal: "#13BBB7",

	lightGray: "#B9BFCA",
	white: "#FFFFFF",
};

export const sem = {
	accent: hue.pink,
	accentHover: hue.deepPink,
	accentFill: hue.deepPink, // white text 5.1:1
	accentFillHover: "#B90051", // white text 6.6:1
	success: hue.green,
	info: hue.blue,
	warning: hue.orange,
	link: hue.skyBlue,

	hint: hue.green,
	added: hue.green,
	modified: hue.blue,
	removed: hue.pink,
	renamed: hue.darkTeal,
	untracked: hue.magenta,
};

export const brackets = {
	one: hue.brightGreen,
	two: hue.brightBlue,
	three: hue.yellow,
	four: hue.coral,
	five: hue.purple,
	six: hue.rose,
};

export const gitGraph: [
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
	string,
] = [
	hue.softPink,
	hue.brightBlue,
	hue.brightGreen,
	hue.yellow,
	hue.coral,
	hue.purple,
	hue.rose,
	hue.paleBlue,
	hue.teal,
	"#9ACC12",
];

export const todo = {
	todo: hue.lightGray,
	fixme: hue.coral,
	bug: hue.pink,
	hack: hue.yellow,
	maybe: hue.teal,
	unchecked: hue.lightGray,
	checked: hue.brightGreen,
};
