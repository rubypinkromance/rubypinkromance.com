class WritingProgress extends HTMLElement {
  connectedCallback() {
    const wordCount = Number(this.getAttribute("word-count"));
    if (!wordCount) {
      console.error("word-count attribute is missing");
      return;
    }
    const goal = Number(this.getAttribute("goal")) || 100_000;
    const roundingIncrement = this.getAttribute("round") || 1;
    const attrStartDate = this.getAttribute("start-date");
    const attrEndDate = this.getAttribute("end-date");

    const now = new Date();
    const year = now.getFullYear();
    const startDate = attrStartDate
      ? new Date(attrStartDate)
      : new Date(year, 0, 1);
    const endDate = attrEndDate
      ? new Date(attrEndDate)
      : new Date(year + 1, 0, 1);
    const totalDuration = endDate.getTime() - startDate.getTime();
    const currentDuration =
      now < endDate ? now.getTime() - startDate.getTime() : totalDuration;
    const durationPercentage = currentDuration / totalDuration;

    const expected = goal * durationPercentage;
    const difference = wordCount - expected;
    const percentage = wordCount / goal;

    const fixed = (percentage) => Number(percentage * 100).toFixed();

    const round = (number) =>
      Number(number).toLocaleString("en", {
        roundingIncrement: roundingIncrement,
        maximumFractionDigits: 0,
      });

    this.innerHTML = `
      <p class="writing-progress__word-count">
        <strong>${round(wordCount)}</strong>
        words written
      </p>
      <details class="writing-progress__details">
        <summary class="writing-progress__summary">
          <strong>${round(Math.abs(difference))}</strong>
          words
          ${difference >= 0 ? "ahead of" : "behind"}
          schedule
        </summary>
        <p><small>
          You are ${fixed(durationPercentage)}% of the way through your writing
          period, and should have written ${round(expected)} words.
        </small></p>
      </details>
      <progress
        class="writing-progress__meter"
        value="${wordCount}"
        max="${goal}"
      >
        ${percentage}%
      </progress>
      <p class="writing-progress__metrics"><small>
        <span class="writing-progress__current">${round(wordCount)}</span> /
        <span class="writing-progress__goal">${goal.toLocaleString("en")}</span>
        <span class="writing-progress__percentage">(${fixed(
          percentage
        )}%)</span>
      </small></p>
    `;
  }
}
customElements.define("writing-progress", WritingProgress);
