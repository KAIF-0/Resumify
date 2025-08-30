import { PortfolioData } from "./types";

export interface TemplateProps {
  userData: PortfolioData | null;
  portId: string;
  accessMap: Record<string, boolean>;
  isCopied: boolean;
  handleCopyUrl: () => Promise<void>;
  setIsPhotoModalOpen: (open: boolean) => void;
}