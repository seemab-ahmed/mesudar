// import { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';

import { useRef } from 'react';
import { saveAs } from 'file-saver';
import { utils, writeFile } from 'xlsx';
import { Document, Paragraph, Packer, TextRun } from 'docx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
    
    // Add title
    doc.setFontSize(20);
    doc.text(`${selectedCategory} Checklist`, 105, 20, { align: 'center' });
    
    let yPosition = 40;
    
    // Add each subcategory and tasks
    Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
      if (tasks.length > 0) {
        // Add subcategory heading
        doc.setFontSize(14);
        doc.text(subcategory, 14, yPosition);
        yPosition += 10;
        
        // Add tasks as a table
        const taskData = tasks.map(task => [String.fromCharCode(9744), task]);
        
        doc.autoTable({
          startY: yPosition,
          head: [['', 'Task']],
          body: taskData,
          margin: { left: 10 },
          styles: { cellPadding: 5, fontSize: 12 },
          columnStyles: { 0: { cellWidth: 10 } },
          didDrawCell: (data) => {
            if (data.section === 'body' && data.column.index === 0) {
              doc.setFontSize(16);
            }
          }
        });
        
        yPosition = doc.lastAutoTable.finalY + 10;
      }
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('mesudar.com - making gabboim\'s lives easier', 105, doc.internal.pageSize.height - 10, { align: 'center' });
    
    doc.save(`${selectedCategory}_Checklist.pdf`);
  };

  // Generate Excel
  const generateExcel = () => {
    const checkedTasks = getCheckedTasks();
    const wb = utils.book_new();
    
    // Create a worksheet for each subcategory
    Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
      if (tasks.length > 0) {
        const wsData = [
          ['Task', 'Completed'],
          ...tasks.map(task => [task, ''])
        ];
        
        const ws = utils.aoa_to_sheet(wsData);
        utils.book_append_sheet(wb, ws, subcategory.substring(0, 31)); // Sheet name max 31 chars
      }
    });
    
    writeFile(wb, `${selectedCategory}_Checklist.xlsx`);
  };

  // Generate Word
  const generateWord = async () => {
    const checkedTasks = getCheckedTasks();
    const doc = new Document();
    
    const children = [
      new Paragraph({
        text: `${selectedCategory} Checklist`,
        heading: "Heading1",
        spacing: { after: 400 }
      })
    ];
    
    Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
      if (tasks.length > 0) {
        children.push(
          new Paragraph({
            text: subcategory,
            heading: "Heading2",
            spacing: { before: 400, after: 200 }
          })
        );
        
        tasks.forEach(task => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: "☐ ",
                  font: "Wingdings"
                }),
                new TextRun({
                  text: task,
                  size: 24
                })
              ],
              spacing: { after: 100 }
            })
          );
        });
      }
    });
    
    children.push(
      new Paragraph({
        text: "mesudar.com - making gabboim's lives easier",
        alignment: "center",
        size: 20,
        color: "999999",
        spacing: { before: 600 }
      })
    );
    
    doc.addSection({
      children
    });
    
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${selectedCategory}_Checklist.docx`);
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