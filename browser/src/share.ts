export default class ShareButton {
  private button: HTMLButtonElement;
  private modal: HTMLDivElement;
  private shareLinks: { name: string; icon: string; href: string }[];
  private currentURL: string;

  constructor() {
    this.currentURL = window.location.href;
    this.button = document.getElementById("share") as HTMLButtonElement;
    this.modal = document.createElement("div");
    this.shareLinks = [
      {
        name: "Facebook",
        icon: "📘",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          this.currentURL
        )}`,
      },
      {
        name: "Twitter",
        icon: "🐦",
        href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          this.currentURL
        )}&text=Check out this page!`,
      },
      {
        name: "LinkedIn",
        icon: "💼",
        href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          this.currentURL
        )}&title=Check out this page!`,
      },
      {
        name: "WhatsApp",
        icon: "📱",
        href: `https://wa.me/?text=${encodeURIComponent(
          `Check out this page! ${this.currentURL}`
        )}`,
      },
      {
        name: "Pinterest",
        icon: "📌",
        href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
          this.currentURL
        )}&description=Check out this page!`,
      },
      {
        name: "Reddit",
        icon: "🔥",
        href: `https://reddit.com/submit?url=${encodeURIComponent(
          this.currentURL
        )}&title=Check out this page!`,
      },
      {
        name: "Telegram",
        icon: "✈️",
        href: `https://t.me/share/url?url=${encodeURIComponent(
          this.currentURL
        )}&text=Check out this page!`,
      },
      {
        name: "Email",
        icon: "📧",
        href: `mailto:?subject=${encodeURIComponent(
          "Check out this page!"
        )}&body=${encodeURIComponent(
          `I found this page interesting and thought you might like it: ${this.currentURL}`
        )}`,
      },
    ];

    this.init();
  }

  private init(): void {
    this.createModal();
    this.attachEventListeners();
  }

  private createModal(): void {
    this.modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 hidden";
    this.modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <button id="closeModal" class="text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer float-right">&times;</button>
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Share this page</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
          ${this.shareLinks
            .map(
              (link) => `
            <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-full transition duration-300 ease-in-out">
              ${link.icon} <span class="text-sm">${link.name}</span>
            </a>
          `
            )
            .join("")}
        </div>
        <button id="copyLink" class="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
          🔗 Copy Link
        </button>
      </div>
    `;
    document.body.appendChild(this.modal);
  }

  private attachEventListeners(): void {
    this.button.addEventListener("click", () => this.openModal());
    this.modal
      .querySelector("#closeModal")
      ?.addEventListener("click", () => this.closeModal());
    this.modal.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.closeModal();
      }
    });
    this.modal
      .querySelector("#copyLink")
      ?.addEventListener("click", () => this.copyLink());
  }

  private openModal(): void {
    this.modal.classList.remove("hidden");
  }

  private closeModal(): void {
    this.modal.classList.add("hidden");
  }

  private copyLink(): void {
    navigator.clipboard
      .writeText(this.currentURL)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying link:", error);
      });
  }
}
