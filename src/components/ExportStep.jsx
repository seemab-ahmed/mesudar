// import { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';

import { useRef } from 'react';
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';
import { Document, Paragraph, Packer, TextRun } from 'docx';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const ExportStep = ({ 
  selectedCategory, 
  tasksData, 
  checkedItems, 
  onBack, 
  onStartOver 
}) => {
  // Get all checked tasks organized by subcategory
  const getCheckedTasks = () => {
    const checkedTasksBySubcategory = {};
    
    if (selectedCategory && tasksData[selectedCategory]) {
      Object.entries(tasksData[selectedCategory]).forEach(([subcategory, tasks]) => {
        checkedTasksBySubcategory[subcategory] = tasks.filter(task => 
          checkedItems[`${subcategory}-${task}`]
        );
      });
    }
    return checkedTasksBySubcategory;
  };

  // Generate PDF

const generatePDF = () => {
  const doc = new jsPDF();
  const checkedTasks = getCheckedTasks();
  
  // Set initial position
  let yPos = 30;
  
  // Add title in rounded rectangle (simulating your rounded-full div)
  doc.setFillColor(22, 160, 133); // Teal color
  doc.setDrawColor(22, 160, 133);
  doc.roundedRect(
    105 - 75, // x (centered)
    yPos - 10, // y
    150, // width
    15, // height
    7.5, // corner radius
    7.5,
    'FD' // Fill and stroke
  );
  
  // Add title text
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255); // White text
  doc.text(`${selectedCategory} Checklist`, 105, yPos, { align: 'center' });
  
  yPos += 25;
  
  // Add each subcategory and tasks
  Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
    if (tasks.length > 0) {
      // Add subcategory heading
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0); // Black text
      doc.text(subcategory, 20, yPos);
      yPos += 10;
      
      // Add tasks with checkboxes
      tasks.forEach(task => {
        // Draw checkbox (empty square)
        doc.setDrawColor(0, 0, 0);
        doc.rect(20, yPos - 4, 5, 5);
        
        // Add task text
        doc.setFont('helvetica', 'normal');
        doc.text(task, 30, yPos);
        yPos += 8;
      });
      
      yPos += 8; // Extra space between sections
    }
  });
  
  // Add footer
  yPos += 15;
  doc.setFontSize(10);
  doc.setTextColor(22, 160, 133); // Teal color
  doc.text('mesudar.com', 105, yPos, { align: 'center' });
  yPos += 5;
  doc.setFontSize(8);
  doc.text('making gabboim\'s lives easier', 105, yPos, { align: 'center' });
  
  // Add border around entire content
  doc.setDrawColor(22, 160, 133); // Teal color
  doc.rect(15, 15, 180, yPos + 5);
  
  doc.save(`${selectedCategory}_Checklist.pdf`);
};
  // Generate Excel
    const generateExcel = () => {
    const checkedTasks = getCheckedTasks();
    const wb = utils.book_new();
    
    // Create a single worksheet for all tasks
    const wsData = [];
    
    // Add title row
    wsData.push([`${selectedCategory} Checklist`]);
    wsData.push(['']); // Empty row for spacing
    
    // Add each subcategory and tasks
    Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
        if (tasks.length > 0) {
        // Add subcategory heading (bold)
        wsData.push([subcategory]);
        
        // Add tasks (without checkboxes)
        tasks.forEach(task => {
            wsData.push([task]);
        });
        
        wsData.push(['']); // Empty row for spacing
        }
    });
    
    // Add footer
    wsData.push(['mesudar.com']);
    wsData.push(['making gabboim\'s lives easier']);
    
    const ws = utils.aoa_to_sheet(wsData);
    
    // Apply styling
    const wscols = [{ wch: 60 }]; // Column width
    ws['!cols'] = wscols;
    
    // Bold the title and subcategories
    ws['A1'].s = { font: { bold: true, sz: 16 } };
    
    Object.keys(ws).forEach(key => {
        if (key.startsWith('A') && ws[key].v && ws[key].v.endsWith('Checklist')) {
        ws[key].s = { font: { bold: true, sz: 14 } };
        }
        if (key.startsWith('A') && checkedTasks[ws[key].v]) {
        ws[key].s = { font: { bold: true } };
        }
    });
    
    utils.book_append_sheet(wb, ws, 'Checklist');
    writeFile(wb, `${selectedCategory}_Checklist.xlsx`);
    };

     // Generate Word

const generateWord = async () => {
  const checkedTasks = getCheckedTasks();
  
  // Create paragraphs array to hold all content
  const paragraphs = [];
  
  // Add title
  paragraphs.push(
    new Paragraph({
      text: `${selectedCategory} Checklist`,
      heading: "Heading1",
      alignment: "center",
      spacing: { after: 400 },
      border: {
        bottom: {
          color: "16A085",
          space: 10,
          value: "single",
          size: 8
        }
      }
    })
  );
  
  // Add spacing
  paragraphs.push(
    new Paragraph({
      text: "",
      spacing: { after: 200 }
    })
  );
  
  // Add content with bullet points
  Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
    if (tasks.length > 0) {
      paragraphs.push(
        new Paragraph({
          text: subcategory,
          heading: "Heading2",
          spacing: { before: 400, after: 200 },
          bold: true
        })
      );
      
      // Add tasks as bullet points
      tasks.forEach(task => {
        paragraphs.push(
          new Paragraph({
            text: task,
            bullet: {
              level: 0 // Top-level bullet
            },
            spacing: { after: 100 },
            indent: { left: 720 } // 0.5 inch indent
          })
        );
      });
      
      paragraphs.push(
        new Paragraph({
          text: "",
          spacing: { after: 200 }
        })
      );
    }
  });
  
  // Add footer
  paragraphs.push(
    new Paragraph({
      text: "mesudar.com",
      alignment: "center",
      spacing: { before: 600 },
      color: "16A085",
      size: 22
    })
  );
  
  paragraphs.push(
    new Paragraph({
      text: "making gabboim's lives easier",
      alignment: "center",
      color: "16A085",
      size: 18
    })
  );

  // Create document with all content
  const doc = new Document({
    creator: "mesudar.com",
    title: `${selectedCategory} Checklist`,
    description: "Generated checklist for shul tasks",
    sections: [{
      properties: {},
      children: paragraphs
    }]
  });

  try {
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${selectedCategory}_Checklist.docx`);
  } catch (error) {
    console.error("Word export error:", error);
    alert("Failed to generate Word document. Please try again.");
  }
};
  // Render preview
  const renderPreview = () => {
    const checkedTasks = getCheckedTasks();
    
    return (
      <div className="border-2 border-teal-500 p-4 rounded-lg relative">
        <div className="bg-teal-500 text-white rounded-full py-2 px-8 mx-auto text-center w-48 mb-6">
          {selectedCategory} Checklist
        </div>
        
        {Object.entries(checkedTasks).map(([subcategory, tasks], index) => (
          <div key={index} className="mb-6">
            <h3 className="font-bold mb-2">{subcategory}</h3>
            {tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-center mb-1">
                <div className="w-5 h-5 border border-gray-300 mr-2"></div>
                <span>{task}</span>
              </div>
            ))}
          </div>
        ))}
        
        <div className="text-center text-teal-500 mt-8">
          <p>mesudar.com</p>
          <p className="text-sm">making gabboim's lives easier</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-teal-500">mesudar.com</h1>
        <p className="text-base">making gabboim's lives easier</p>
      </div>
      
      <div className="mt-4 mb-8">
        {renderPreview()}
      </div>
      
      <div className="mt-4 space-y-3 flex flex-col">
        <button 
          onClick={generatePDF}
          className="bg-teal-500 text-white rounded-full py-3 px-6 text-center hover:bg-teal-600 transition-colors"
        >
          Export as PDF
        </button>
        <button 
          onClick={generateExcel}
          className="bg-teal-500 text-white rounded-full py-3 px-6 text-center hover:bg-teal-600 transition-colors"
        >
          Export as Excel
        </button>
        <button 
          onClick={generateWord}
          className="bg-teal-500 text-white rounded-full py-3 px-6 text-center hover:bg-teal-600 transition-colors"
        >
          Export as Word
        </button>
      </div>
      
      <div className="mt-6 flex justify-between">
        <button 
          onClick={onBack}
          className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={onStartOver}
          className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

// export const ExportStep = ({ 
//   selectedCategory, 
//   tasksData, 
//   checkedItems, 
//   onBack, 
//   onStartOver 
// }) => {
//   const pdfRef = useRef();
  
//   const handlePrint = useReactToPrint({
//     content: () => pdfRef.current,
//   });

//   const renderPDFContent = () => {
//     const checkedTasksBySubcategory = {};
    
//     if (selectedCategory && tasksData[selectedCategory]) {
//       Object.entries(tasksData[selectedCategory]).forEach(([subcategory, tasks]) => {
//         checkedTasksBySubcategory[subcategory] = tasks.filter(task => 
//           checkedItems[`${subcategory}-${task}`]
//         );
//       });
//     }

//     return (
//       <div ref={pdfRef} className="border-2 border-teal-500 p-4 rounded-lg relative">
//         <div className="bg-teal-500 text-white rounded-full py-2 px-8 mx-auto text-center w-48 mb-6">
//           {selectedCategory} Checklist
//         </div>
        
//         {Object.entries(checkedTasksBySubcategory).map(([subcategory, tasks], index) => (
//           <div key={index} className="mb-6">
//             <h3 className="font-bold mb-2">{subcategory}</h3>
//             {tasks.map((task, taskIndex) => (
//               <div key={taskIndex} className="flex items-center mb-1">
//                 <div className="w-5 h-5 border border-gray-300 mr-2"></div>
//                 <span>{task}</span>
//               </div>
//             ))}
//           </div>
//         ))}
        
//         <div className="text-center text-teal-500 mt-8">
//           <p>mesudar.com</p>
//           <p className="text-sm">making gabboim's lives easier</p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-8 max-w-2xl mx-auto">
//       <div>
//         <h1 className="text-3xl font-bold text-teal-500">mesudar.com</h1>
//         <p className="text-base">making gabboim's lives easier</p>
//       </div>
      
//       <div className="mt-4 mb-8">
//         {renderPDFContent()}
//       </div>
      
//       <div className="mt-4 space-y-3 flex flex-col">
//         <button 
//           onClick={handlePrint}
//           className="bg-teal-500 text-white rounded-full py-3 px-6 text-center hover:bg-teal-600 transition-colors"
//         >
//           Export as PDF
//         </button>
//         <button 
//           onClick={() => alert('Word export would be implemented here')}
//           className="bg-teal-500 text-white rounded-full py-3 px-6 text-center hover:bg-teal-600 transition-colors"
//         >
//           Export as Word
//         </button>
//         <button 
//           onClick={() => alert('Excel export would be implemented here')}
//           className="bg-teal-500 text-white rounded-full py-3 px-6 text-center hover:bg-teal-600 transition-colors"
//         >
//           Export as Excel
//         </button>
//       </div>
      
//       <div className="mt-6 flex justify-between">
//         <button 
//           onClick={onBack}
//           className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
//         >
//           Back
//         </button>
//         <button 
//           onClick={onStartOver}
//           className="border-2 border-teal-500 text-teal-500 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors"
//         >
//           Start Over
//         </button>
//       </div>
//     </div>
//   );
// };