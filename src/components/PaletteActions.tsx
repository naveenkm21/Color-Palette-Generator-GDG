import React, { useState } from 'react';
import { Save, Share2, Download } from 'lucide-react';

interface PaletteActionsProps {
  onSave: () => void;
  onShare: () => void;
  onExport: () => void;
}

const PaletteActions: React.FC<PaletteActionsProps> = ({ 
  onSave, 
  onShare, 
  onExport 
}) => {
  const [saveAnimation, setSaveAnimation] = useState(false);
  const [shareAnimation, setShareAnimation] = useState(false);
  const [exportAnimation, setExportAnimation] = useState(false);
  
  const handleSave = () => {
    onSave();
    setSaveAnimation(true);
    setTimeout(() => setSaveAnimation(false), 800);
  };
  
  const handleShare = () => {
    onShare();
    setShareAnimation(true);
    setTimeout(() => setShareAnimation(false), 800);
  };
  
  const handleExport = () => {
    onExport();
    setExportAnimation(true);
    setTimeout(() => setExportAnimation(false), 800);
  };
  
  return (
    <div className="flex gap-3 mt-6 justify-center">
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-all ${
          saveAnimation ? 'animate-pulse' : ''
        }`}
        onClick={handleSave}
      >
        <Save size={16} />
        <span>Save</span>
      </button>
      
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all ${
          shareAnimation ? 'animate-pulse' : ''
        }`}
        onClick={handleShare}
      >
        <Share2 size={16} />
        <span>Share</span>
      </button>
      
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all ${
          exportAnimation ? 'animate-pulse' : ''
        }`}
        onClick={handleExport}
      >
        <Download size={16} />
        <span>Export</span>
      </button>
    </div>
  );
};

export default PaletteActions;