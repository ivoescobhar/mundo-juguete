import { forwardRef } from 'react';
import { PAGE_WIDTH, PAGE_HEIGHT } from '@/lib/pdfExport';

const PdfPageFrame = forwardRef(function PdfPageFrame({ children }, ref) {
  return (
    <div
      ref={ref}
      className="relative flex flex-col overflow-hidden bg-toyCanvas"
      style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
    >
      {children}
    </div>
  );
});

export default PdfPageFrame;