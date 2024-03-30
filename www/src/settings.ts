const rustCodeSnippet = `<span class="comment">/// Frobnicates the bar based on the value of w.</span>
<span class="kw">fn</span> <span class="fn">frobnicate</span><span class="punct">(</span><span class="param">bar</span><span class="punct">:</span> <span class="primitive">f32</span><span class="punct">,</span> <span class="param">w</span><span class="punct">:</span> <span class="kw">impl</span> <span class="generic">AsRef</span><span class="punct">&lt;[</span><span class="type">Wrapped</span><span class="punct">&gt;]) -></span> <span class="type">Option</span><span class="punct">&lt;</span><span class="primitive">char</span><span class="punct">&gt;</span> {
	<span class="goto">'looop</span><span class="punct">:</span> <span class="kw">for</span> <span class="var">x</span><span class="inlay">: &amp;Wrapped</span> <span class="kw">in</span> <span class="param">w</span><span class="punct">.</span><span class="fn">as_ref</span><span class="punct">() {</span>
		<span class="kw">if</span> <span class="param">bar</span> <span class="punct">&lt;</span> <span class="var">x</span><span class="punct">.</span><span class="member">inner</span> <span class="punct">+</span> <span class="num">5.0</span> <span class="punct">{</span>
			<span class="fn">println!</span><span class="punct">(</span><span class="str">"Bar is small"</span><span class="punct">);</span>
			<span class="kw">break</span> <span class="goto">'looop</span><span class="punct">;</span>
		<span class="punct">}</span>
	<span class="punct">}</span>
	<span class="kw">let</span> <span class="var">_</span> <span class="punct">=</span> <span class="enum">true</span><span class="punct">;</span>
	<span class="enum">Some</span><span class="punct">(</span><span class="char">'a'</span><span class="punct">)</span>
<span class="punct">}</span>`;

const settings = [
	{
		name: "Italicized Comments",
		key: "theme-pink-candy.italicizedComments",
		type: "boolean",
		options: ["false", "true"],
		description: "Controls whether comments are italicized.",
		fn: (id: string) => {
			const select = document.getElementById(id) as HTMLSelectElement;
			const commentSpans = Array.from(document.getElementsByClassName("comment"));
			select.onchange = (e) => {
				switch (select.selectedIndex) {
					case 0:
						commentSpans.forEach((el) => el.classList.remove("italicized"));
						break;
					case 1:
						commentSpans.forEach((el) => el.classList.add("italicized"));
						break;
				}
			};
		},
	},
];

const root = document.getElementById("main");
const codeblock = document.getElementById("codeblock");
codeblock.innerHTML = `<pre><code>\r\n${rustCodeSnippet}\r\n</code></pre>`;

settings.forEach((setting) => {
	let div = document.createElement("div");
	div.classList.add("setting");
	let select = `<select id="${setting.key}">`;
	setting.options.forEach((option) => {
		select += `<option>${option}</option>`;
	});
	select += "</select>";
	div.innerHTML = `<h2>${setting.name}</h2><p><span class="key">${setting.key}<span> <span class="type">(${setting.type})</span></p><p class="description">${setting.description}</p>${select}`;
	root.appendChild(div);

	setting.fn(setting.key);
});
