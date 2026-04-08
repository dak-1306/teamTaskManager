import React from "react";
import {
  Pagination as Nav,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxButtons?: number;
  className?: string;
};

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxButtons = 5,
  className,
}: Props) {
  const total = Math.max(1, Math.floor(totalPages) || 1);
  const cur = clamp(Math.floor(currentPage) || 1, 1, total);

  const half = Math.floor(maxButtons / 2);
  let start = cur - half;
  let end = cur + half;
  if (start < 1) {
    start = 1;
    end = Math.min(total, start + maxButtons - 1);
  }
  if (end > total) {
    end = total;
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <Nav className={className} aria-label="Pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-label="Previous page"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (cur > 1) onPageChange(cur - 1);
            }}
            disabled={(cur <= 1) as any}
          />
        </PaginationItem>

        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  onPageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {start > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === cur}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (p !== cur) onPageChange(p);
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {end < total && (
          <>
            {end < total - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  onPageChange(total);
                }}
              >
                {total}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-label="Next page"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (cur < total) onPageChange(cur + 1);
            }}
            disabled={(cur >= total) as any}
          />
        </PaginationItem>
      </PaginationContent>
    </Nav>
  );
}
