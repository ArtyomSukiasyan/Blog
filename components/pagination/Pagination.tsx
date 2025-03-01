import Link from 'next/link';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  tag?: string;
}

export default function Pagination({ currentPage, totalPages, tag }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    params.set('page', pageNum.toString());
    if (tag) params.set('tag', tag);
    return `/?${params.toString()}`;
  };

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className={styles.pageLink}
        >
          ← Previous
        </Link>
      )}

      <div className={styles.pageNumbers}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <Link
            key={pageNum}
            href={createPageUrl(pageNum)}
            className={`${styles.pageLink} ${
              pageNum === currentPage ? styles.active : ''
            }`}
          >
            {pageNum}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className={styles.pageLink}
        >
          Next →
        </Link>
      )}
    </div>
  );
} 