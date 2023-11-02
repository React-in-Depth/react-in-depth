import { FC, useState } from "react";
import "./paginable.css";

const PERPAGE = 4;

interface PaginableProps<Type> {
  items: Array<Type>;
  Renderer: FC<PaginableItemProps<Type>>;
  className?: string;
}

interface PaginableItemProps<Type> {
  item: Type;
  index: number;
}

export function Paginable<Type>({
  items,
  Renderer,
  className,
}: PaginableProps<Type>) {
  const [currentPage, setCurrentPage] = useState(0);
  const startOffset = currentPage * PERPAGE;
  const endOffset = (currentPage + 1) * PERPAGE;
  const subset = items.slice(startOffset, endOffset);
  const numPages = Math.ceil(items.length / PERPAGE);
  const pages = Array.from(Array(numPages)).map((_, v) => v);
  return (
    <section className={className}>
      {subset.map((item, index) => (
        <Renderer key={index} item={item} index={index + startOffset} />
      ))}
      {numPages > 1 && (
        <ol className="pagination">
          {pages.map((page) => (
            <li className="pagination__item" key={page}>
              {page === currentPage ? (
                page + 1
              ) : (
                <button
                  className="pagination__link"
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </button>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
