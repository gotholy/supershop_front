import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ArticleListItem({ article }) {
  const ctx = useContext(CartContext);

  const handleDelete = async () => {
    let id = article._id;
    try {
      await fetch(import.meta.env.VITE_BACKEND + "/api/article/" + id, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Fehler beim Löschen des Artikels:", error);
    }
  };

  return (
    <div className="flex flex-row gap-5 mt-8 rounded-3xl border border-primary">
      <img
        src={import.meta.env.VITE_BACKEND + "/" + article.imagepath}
        alt=""
        className="w-2/12 rounded-3xl"
      />
      <div className="mt-10">
        <h2 className="text-3xl">{article.articlename}</h2>
        <p className="my-5 font-mono">{article.articledescription}</p>
        <div className="flex gap-3 items-baseline">
          <p className="text-xl">{article.articleprice} Euro</p>
          <button
            onClick={() =>
              ctx.setCart((prev) => {
                return [...prev, article];
              })
            }
            className="btn btn-primary"
          >
            In den Warenkorb
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Löschen
          </button>
        </div>
      </div>
    </div>
  );
}
