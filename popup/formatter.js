function onGot(page) {
  const text = document.getElementById('inputJSON').value;
  const resp = page.WASMGo.prettifyJSON(text)
  document.getElementById('outputJSON').innerHTML = resp;
}

function onError(error) {
  console.log(`Error: ${error}`);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("launchWASM")) {
    const getting = browser.runtime.getBackgroundPage();
    getting.then(onGot, onError);
  }

  if (e.target.classList.contains("copyJSON")) {
    const copyText = document.getElementById("outputJSON");
    const range = document.createRange();
    range.selectNode(copyText);
    window.getSelection().addRange(range);

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        document.querySelector(".copyJSON").textContent = "Copied";
      }
    } catch (err) {
      console.log('Oops, unable to copy');
    }
  }
});