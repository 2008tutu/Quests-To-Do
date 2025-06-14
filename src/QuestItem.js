import { useState } from "react";

export default function QuestItem(props) {
  // recebe e define o título da missão
  const [title, setTitle] = useState(props.quest.title);
  // recebe e define se a missão foi concluída
  const [checked, setChecked] = useState(false);
  // chama o estado de edição da missão no componente
  const [editMode, setEditMode] = useState(false);
  // define o visual da missão na lista
  const concluded = props.quest.status === "concluído";

  return (
    <div
      className="flex gap-4 flex-col md:flex-row items-center"
      // id para teste do componente
      data-testid="questItem"
    >
      <div className="flex gap-4 items-center w-full sm:w-[80%]">
        <input
          disabled={concluded}
          type="checkbox"
          checked={checked}
          className="checkbox rounded-full border"
          onChange={() => {
            if (concluded) return;
            else {
              setChecked(!checked);
              props.saveConcludedQuest(props.quest);
            }
          }}
        />

        {editMode && !concluded ? (
          <input
            placeholder="quest"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-full bg-secundary pl-2 w-full input-sm flex focus:outline-none"
            // id para teste do input
            data-testid="input"
          />
        ) : (
          <p
            className={`break-words ${concluded ? "line-through" : ""}`}
            // id para teste do parágrafo
            data-testid="title"
          >
            {props.quest.title}
          </p>
        )}
      </div>
      {!concluded && (
        <div
          className="flex gap-4 w-full sm:w-fit justify-center"
          // id da div de edição
          data-testid="buttons"
        >
          <button
            // id do botão de edição
            data-testid="editButton"
            onClick={() => {
              if (editMode) props.saveEditQuest(props.quest, title);
              setEditMode(!editMode);
            }}
          >
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
            </svg>

          </button>
          <button
            onClick={() => {
              if (concluded) return;
              else props.saveDeleteQuest(props.quest);
            }}
          >
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>

          </button>
        </div>
      )}
    </div>
  );
}
