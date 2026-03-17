import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
  downloadName: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  resumeUrl,
  downloadName,
}) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] text-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-black/60 p-4 backdrop-blur-md">
              <div className="flex flex-wrap gap-4">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={downloadName}
                  className="flex items-center gap-2 rounded-xl bg-[#00d4ff] px-4 py-2 text-sm font-bold text-black transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.35)]"
                >
                  <Download size={18} /> DOWNLOAD PDF
                </a>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-white/10"
                >
                  <ExternalLink size={18} /> OPEN IN NEW TAB
                </a>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-white/5 p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white"
                aria-label="Close resume preview"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 bg-white">
              <iframe
                src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                title="Aditya Roy Bardhan resume"
                className="h-full w-full border-0"
              />
            </div>

            <div className="border-t border-white/10 bg-black/60 px-4 py-3 text-sm text-white/60">
              If the preview does not render in your browser, use DOWNLOAD PDF or OPEN IN NEW TAB.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
