import React from "react";
import clsx from "clsx";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const maxVisiblePages = 4;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className={clsx("flex items-center justify-center gap-2", className)}>
      <Button
        title="Ir para primeira página"
        variant="secondary"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="w-10 sm:w-13 shrink-0 px-2!"
        aria-label="Página anterior"
        size="sm"
      >
        <FiChevronsLeft size={20} />
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "primary" : "secondary"}
            onClick={() => onPageChange(page)}
            className={clsx(
              "w-10 sm:w-13 shrink-0",
              currentPage === page && "pointer-events-none",
            )}
            size="sm"
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        title="Ir para ultima página"
        variant="secondary"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="w-10 sm:w-13 shrink-0 px-2!"
        aria-label="Próxima página"
        size="sm"
      >
        <FiChevronsRight size={20} />
      </Button>
    </div>
  );
};

export default Pagination;
