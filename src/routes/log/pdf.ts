import { jsPDF } from 'jspdf';
import type { Activity } from 'src/types';

export const generatePDF = (activities: Activity[]) => {
	const doc = new jsPDF();
	doc.text('hello world', 10, 10);
	doc.save('example.pdf');
};
