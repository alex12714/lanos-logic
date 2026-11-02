// Service icon names (as stored in data files) -> lucide components.
// Used by the Solutions menu and the category pages.
import {
  Bot, Phone, FileText, Workflow, Share2, MessageSquare, Smartphone,
  BarChart3, Database, ScanLine, ShieldAlert, ShieldCheck, Sparkles, Bug, Handshake,
} from 'lucide-react';

export const serviceIcons = {
  Bot, Phone, FileText, Workflow, Share2, MessageSquare, Smartphone,
  BarChart3, Database, ScanLine, ShieldAlert, ShieldCheck, Sparkles, Bug, Handshake,
};

export const serviceIcon = (name) => serviceIcons[name] || Bot;
