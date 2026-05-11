import React from "react";
import clsx from "clsx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
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

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={clsx("flex items-center justify-center gap-2", className)}>
      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-13 shring-0! px-2!"
        aria-label="Página anterior"
        size="sm"
      >
        <HiChevronLeft size={20} />
      </Button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "primary" : "secondary"}
            onClick={() => onPageChange(page)}
            className={clsx(
              "min-w-10",
              currentPage === page && "pointer-events-none",
            )}
            size="sm"
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-13 shring-0! px-2!"
        aria-label="Próxima página"
        size="sm"
      >
        <HiChevronRight size={20} />
      </Button>
    </div>
  );
};

export default Pagination;
