# Duck-Rabbit Philosophy Farm 🦆🐰

Welcome to the **Duck-Rabbit Philosophy Farm**, an interactive, educational game designed to introduce children to philosophical concepts through playful exploration. Join Duck and Rabbit as they guide young philosophers around a whimsical farm, exploring ideas from autonomy and belief to ethical dilemmas like a child-friendly version of the trolley problem!

## 🎮 How to Play

* Explore the farm by clicking areas on the interactive map.
* Discover hidden letters scattered throughout the scenes. Each one is a colorful image from the `assets/images/letters` folder.
* When a letter is clicked, it slides to the bottom of the screen and lines up with the others.
* Each letter reveals a philosophical concept, a friendly explanation, and engaging questions.
* Click on the Duck-Rabbit icon anytime for helpful advice or hints. After you find all 26 letters, the icon congratulates you and any unfound letters in the current scene briefly grow larger to help you spot them.
* Once you reach the picnic area, a map icon appears in the top-left corner. Click it to return to the farm map.
* Use the **Back** button to return to the previous scene whenever you like.

## 🌟 Key Features

* **Interactive exploration**: Navigate through various engaging scenes like Sheep in the Field, What is it Like to Be a Bat, and Shadows in the Cave.
* **Educational dialogues**: Duck and Rabbit guide thoughtful discussions on philosophical questions tailored for kids.
* **Engaging visuals**: Cartoon farmyard characters and colorful backgrounds create an inviting environment for learning.
* **Sound effects**: Scene changes and animal clicks play short audio clips from `assets/audio`.

## 🛠️ Technology Used

* **JavaScript** with the **p5.js** library for creative coding.
* **HTML/CSS** for structure and styling.
* Hosted on **GitHub Pages** for easy access and sharing.

## 🚀 How to Run Locally

To run the game locally on your machine:

1. Clone this repository:

```bash
git clone https://github.com/maxaeon/philosophygame.git
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open `http://localhost:8080` (or the URL shown in the terminal) in your web browser.

## 📁 Project Structure

```
philosophygame/
├── assets/
│   ├── images/       # Game visuals
│   └── audio/        # Sound effects
├── js/
│   ├── characters.js
│   ├── sceneCharacters.js  # Characters by scene
│   ├── scenes.js
│   ├── letters.js
│   └── sketch.js
├── index.html        # Main HTML file
└── style.css         # Styling
```

### Scene-specific character settings

The file `js/sceneCharacters.js` exports an optional `sceneCharacterSettings`
object. Use it to override where a character appears and how large it is in a
given scene:

```javascript
sceneCharacterSettings["barn"] = {
  donkey: { x: 340, y: 400, size: 140 }
};
```

Any properties you specify will temporarily replace the character's default
`x`, `y` and `size` values while that scene is drawn.

## ✔️ Checking Assets

Before committing changes, run the asset check to make sure all image paths
used in the JavaScript files exist:

```bash
npm run check-assets
```

## 🤝 Contribution

Suggestions and contributions are welcome! Feel free to open issues or submit pull requests to help enhance the game.

## 📜 License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International license (CC BY-NC 4.0). See `LICENSE` for more information.

The Duck-Rabbit Philosophy Farm game and its characters are
**© 2025 maxaeon**. The game remains free here on GitHub, though it may be sold for a small fee on Steam. You may reuse the code in
this repository to create your own games, but please credit this project
and do not claim the original characters as your own.
Codex was used as in translating this game from codeblocks.
SORA was used as in developing the character appearance.

---

Enjoy exploring philosophy with Duck and Rabbit! 🎉
