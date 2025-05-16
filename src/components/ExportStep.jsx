
import { useRef } from 'react';
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';
import { Document, Paragraph, Packer } from 'docx';
import { jsPDF } from "jspdf";

export const ExportStep = ({ 
  selectedCategory, 
  tasksData, 
  checkedItems, 
  onBack, 
  onStartOver 
}) => {
  const getCheckedTasks = () => {
    const checkedTasksBySubcategory = {};
    if (selectedCategory && tasksData[selectedCategory]) {
      Object.entries(tasksData[selectedCategory]).forEach(([subcategory, tasks]) => {
        const checkedTasks = tasks.filter(task =>
          checkedItems[`${subcategory}-${task}`]
        );
        // Only include subcategories with at least one checked task
        if (checkedTasks.length > 0) {
          checkedTasksBySubcategory[subcategory] = checkedTasks;
        }
      });
    }
    return checkedTasksBySubcategory;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const checkedTasks = getCheckedTasks();
    
    // Return early if no tasks are selected
    if (Object.keys(checkedTasks).length === 0) {
      alert("No tasks selected to export");
      return;
    }

    let yPos = 30;

    doc.setFillColor(22, 160, 133);
    doc.setDrawColor(22, 160, 133);
    doc.roundedRect(30, yPos - 10, 150, 15, 7.5, 7.5, 'FD');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(`${selectedCategory} Checklist`, 105, yPos, { align: 'center' });
    yPos += 25;

    Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(subcategory, 20, yPos);
      yPos += 10;

      tasks.forEach(task => {
        doc.setDrawColor(0, 0, 0);
        doc.rect(20, yPos - 4, 5, 5);
        doc.setFont('helvetica', 'normal');
        doc.text(task, 30, yPos);
        yPos += 8;
      });

      yPos += 8;
    });

    yPos += 15;
    doc.setFontSize(10);
    doc.setTextColor(22, 160, 133);
    doc.text('mesudar.com', 105, yPos, { align: 'center' });
    yPos += 5;
    doc.setFontSize(8);
    doc.text('making gabboim\'s lives easier', 105, yPos, { align: 'center' });

    doc.setDrawColor(22, 160, 133);
    doc.rect(15, 15, 180, yPos + 5);
    doc.save(`${selectedCategory}_Checklist.pdf`);
  };

  const generateExcel = () => {
    const checkedTasks = getCheckedTasks();
    
    // Return early if no tasks are selected
    if (Object.keys(checkedTasks).length === 0) {
      alert("No tasks selected to export");
      return;
    }

    const wb = utils.book_new();
    const wsData = [];

    wsData.push([`${selectedCategory} Checklist`]);
    wsData.push(['']);

    Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
      wsData.push([subcategory]);
      tasks.forEach(task => wsData.push([task]));
      wsData.push(['']);
    });

    wsData.push(['mesudar.com']);
    wsData.push(['making gabboim\'s lives easier']);

    const ws = utils.aoa_to_sheet(wsData);
    ws['!cols'] = [{ wch: 60 }];
    utils.book_append_sheet(wb, ws, 'Checklist');
    writeFile(wb, `${selectedCategory}_Checklist.xlsx`);
  };

  const generateWord = async () => {
    const checkedTasks = getCheckedTasks();
    
    // Return early if no tasks are selected
    if (Object.keys(checkedTasks).length === 0) {
      alert("No tasks selected to export");
      return;
    }

    const paragraphs = [];

    paragraphs.push(new Paragraph({
      text: `${selectedCategory} Checklist`,
      heading: "Heading1",
      alignment: "center",
      spacing: { after: 400 },
      border: { bottom: { color: "16A085", space: 10, value: "single", size: 8 } }
    }));

    Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
      paragraphs.push(new Paragraph({
        text: subcategory,
        heading: "Heading2",
        spacing: { before: 400, after: 200 },
        bold: true
      }));

      tasks.forEach(task => {
        paragraphs.push(new Paragraph({
          text: task,
          bullet: { level: 0 },
          spacing: { after: 100 },
          indent: { left: 720 }
        }));
      });

      paragraphs.push(new Paragraph({ text: "", spacing: { after: 200 } }));
    });

    paragraphs.push(new Paragraph({
      text: "mesudar.com",
      alignment: "center",
      spacing: { before: 600 },
      color: "16A085",
      size: 22
    }));
    paragraphs.push(new Paragraph({
      text: "making gabboim's lives easier",
      alignment: "center",
      color: "16A085",
      size: 18
    }));

    const doc = new Document({
      creator: "mesudar.com",
      title: `${selectedCategory} Checklist`,
      description: "Generated checklist for shul tasks",
      sections: [{ properties: {}, children: paragraphs }]
    });

    try {
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${selectedCategory}_Checklist.docx`);
    } catch (error) {
      console.error("Word export error:", error);
      alert("Failed to generate Word document. Please try again.");
    }
  };

  const renderPreview = () => {
    const checkedTasks = getCheckedTasks();
    
    // Return early if no tasks are selected
    if (Object.keys(checkedTasks).length === 0) {
      return (
        <div className="border border-teal-400 shadow-md p-6 rounded-2xl bg-white text-center">
          <p className="text-gray-600">No tasks selected to export</p>
        </div>
      );
    }

    return (
      <div className="border border-teal-400 shadow-md p-6 rounded-2xl bg-white">
        <div className="bg-[#13AE8D] text-white font-semibold rounded-full py-2 px-6 mx-auto text-center w-fit mb-6 text-lg shadow-sm">
          {selectedCategory} Checklist
        </div>

        {Object.entries(checkedTasks).map(([subcategory, tasks], index) => (
          <div key={index} className="mb-6">
            <p className="text-teal-600 font-bold mb-2 text-lg">{subcategory}</p>
            {tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 border-2 border-[#000] rounded-[50%] flex items-center justify-center text-xs text-black"></div>
                <span className="text-gray-800 text-sm">{task}</span>
              </div>
            ))}
          </div>
        ))}

        <div className="text-center text-teal-600 mt-8">
          <p className="font-semibold">mesudar.com</p>
          <p className="text-sm">making gabboim's lives easier</p>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#13AE8D]">mesudar.com</h1>
        <p className="text-sm text-gray-600">making gabboim's lives easier</p>
      </div>

      {renderPreview()}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={generatePDF}
          className="bg-[#13AE8D] hover:bg-teal-600 text-white py-3 px-5 rounded-full shadow-md transition"
          disabled={Object.keys(getCheckedTasks()).length === 0}
        >
          Export as PDF
        </button>
        <button
          onClick={generateExcel}
          className="bg-[#13AE8D] hover:bg-teal-600 text-white py-3 px-5 rounded-full shadow-md transition"
          disabled={Object.keys(getCheckedTasks()).length === 0}
        >
          Export as Excel
        </button>
        <button
          onClick={generateWord}
          className="bg-[#13AE8D] hover:bg-teal-600 text-white py-3 px-5 rounded-full shadow-md transition"
          disabled={Object.keys(getCheckedTasks()).length === 0}
        >
          Export as Word
        </button>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onBack}
          className="border-2 border-[#13AE8D] text-[#13AE8D] font-semibold rounded-full px-6 py-2 hover:bg-[#13AE8D] hover:text-[#fff] transition-colors"
        >
          Back
        </button>
        <button
          onClick={onStartOver}
          className="text-[#13AE8D] border-2 border-[#13AE8D] py-2 px-6 rounded-full hover:bg-[#13AE8D] hover:text-[#fff] transition"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};