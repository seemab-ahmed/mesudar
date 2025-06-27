import { useRef } from "react";
import { saveAs } from "file-saver";
import { LogoDotcom } from "../assets";
import { utils, writeFile } from "xlsx";
import { Document, Paragraph, Packer } from "docx";
import { jsPDF } from "jspdf";

export const ExportStep = ({
  selectedCategory,
  tasksData,
  checkedItems,
  onBack,
  onStartOver,
}) => {
  const getCheckedTasks = () => {
    const checkedTasksBySubcategory = {};
    if (selectedCategory && tasksData[selectedCategory]) {
      Object.entries(tasksData[selectedCategory]).forEach(
        ([subcategory, tasks]) => {
          const checkedTasks = tasks.filter(
            (task) => checkedItems[`${subcategory}-${task}`]
          );
          // Only include subcategories with at least one checked task
          if (checkedTasks.length > 0) {
            checkedTasksBySubcategory[subcategory] = checkedTasks;
          }
        }
      );
    }
    return checkedTasksBySubcategory;
  };

  // const generatePDF = async () => {
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   const checkedTasks = getCheckedTasks();

  //   if (Object.keys(checkedTasks).length === 0) {
  //     alert("No tasks selected to export");
  //     return;
  //   }

  //   // Set font - change to a serif font available in jsPDF
  //   doc.setFont("helvetica", "normal"); // Using helvetica as serif font

  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const pageHeight = doc.internal.pageSize.getHeight();
  //   const margin = 15;
  //   let yPos = 25;
  //   const mainColor = "#1f7333"; // Green color
  //   const textColor = "#535252"; // Gray color

  //   // Add background color (outer color)
  //   doc.setFillColor(252, 241, 230); // #fcf1e6
  //   doc.rect(0, 0, pageWidth, pageHeight, "F");

  //   // Add white content area with rounded border
  //   doc.setFillColor(255, 255, 255); // WHITE for inside border
  //   doc.setDrawColor(31, 115, 51); // #1f7333 border color
  //   doc.roundedRect(
  //     margin,
  //     margin,
  //     pageWidth - 2 * margin,
  //     pageHeight - 2 * margin,
  //     5,
  //     5,
  //     "FD"
  //   );

  //   // ===== TITLE =====
  //   doc.setFillColor(mainColor);
  //   doc.setDrawColor(mainColor);
  //   const titleWidth =
  //     (doc.getStringUnitWidth(`${selectedCategory} Checklist`) * 25) /
  //     doc.internal.scaleFactor;
  //   doc.roundedRect(
  //     (pageWidth - titleWidth - 20) / 2,
  //     yPos,
  //     titleWidth + 20,
  //     15,
  //     7.5,
  //     7.5,
  //     "FD"
  //   );
  //   doc.setFontSize(14);
  //   doc.setTextColor(255, 255, 255);
  //   doc.text(`${selectedCategory} Checklist`, pageWidth / 2, yPos + 10, {
  //     align: "center",
  //   });
  //   yPos += 30;

  //   // ===== CONTENT =====
  //   Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
  //     // Check page space before adding content
  //     if (yPos > pageHeight - 50) {
  //       doc.addPage();
  //       yPos = margin + 30;
  //       // Add border and background to new page
  //       // doc.setFillColor(252, 241, 230);
  //       // doc.rect(0, 0, pageWidth, pageHeight, 'F');
  //       // doc.setDrawColor(mainColor);
  //       // doc.roundedRect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin, 5, 5, 'FD');
  //       doc.setFillColor(252, 241, 230); // #fcf1e6
  //       doc.rect(0, 0, pageWidth, pageHeight, "F");

  //       // Add white content area with rounded border
  //       doc.setFillColor(255, 255, 255); // WHITE for inside border
  //       doc.setDrawColor(31, 115, 51); // #1f7333 border color
  //       doc.roundedRect(
  //         margin,
  //         margin,
  //         pageWidth - 2 * margin,
  //         pageHeight - 2 * margin,
  //         5,
  //         5,
  //         "FD"
  //       );
  //     }

  //     // Subcategory title - larger and bold
  //     doc.setFontSize(18);
  //     doc.setTextColor(mainColor);
  //     doc.setFont("helvetica", "bold");
  //     doc.text(subcategory, margin + 10, yPos);
  //     yPos += 10; // More space after section title

  //     // Tasks
  //     doc.setFontSize(14);
  //     doc.setTextColor(0, 0, 0); // Black
  //     doc.setFont("helvetica", "normal");

  //     tasks.forEach((task) => {
  //       if (yPos > pageHeight - 20) {
  //         doc.addPage();
  //         yPos = margin + 30;
  //         // Add border and background to new page
  //         doc.setFillColor(252, 241, 230);
  //         doc.rect(0, 0, pageWidth, pageHeight, "F");
  //         doc.setDrawColor(mainColor);
  //         doc.roundedRect(
  //           margin,
  //           margin,
  //           pageWidth - 2 * margin,
  //           pageHeight - 2 * margin,
  //           5,
  //           5,
  //           "FD"
  //         );
  //       }

  //       // Checkbox with rounded corners
  //       doc.setDrawColor(mainColor);
  //       doc.roundedRect(margin + 10, yPos - 3, 4, 4, 1, 1, "S");

  //       // Task text
  //       doc.text(task, margin + 20, yPos);
  //       yPos += 8;
  //     });

  //     // Add divider line between sections (like the --- in your markdown)
  //     // if (yPos < pageHeight - 20) {
  //     //   doc.setDrawColor(200, 200, 200); // Light gray line
  //     //   doc.line(margin + 10, yPos + 5, pageWidth - margin - 10, yPos + 5);
  //     //   yPos += 15; // Extra space after divider
  //     // } else {
  //     yPos += 5; // Minimal space if we're at page end
  //     // }
  //   });

  //   // ===== FOOTER =====
  //   try {
  //     const imgWidth = 40;
  //     const imgHeight = 10;
  //     const logoY = pageHeight - margin - 15;
  //     doc.addImage(
  //       LogoDotcom,
  //       "PNG",
  //       (pageWidth - imgWidth) / 2,
  //       logoY,
  //       imgWidth,
  //       imgHeight
  //     );
  //   } catch (error) {
  //     doc.setFontSize(10);
  //     doc.setTextColor(mainColor);
  //     doc.text("mesudar.com", pageWidth / 2, pageHeight - margin - 10, {
  //       align: "center",
  //     });
  //   }

  //   doc.save(`${selectedCategory}_Checklist.pdf`);
  // };
  
  
  const generatePDF = async () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "letter", // Changed from "a4" to "letter" for US standard
  });

  const checkedTasks = getCheckedTasks();

  if (Object.keys(checkedTasks).length === 0) {
    alert("No tasks selected to export");
    return;
  }

  // Add Raleway font if available, otherwise fallback to helvetica
  doc.addFont('/fonts/Raleway-Regular.ttf', 'Raleway', 'normal');
doc.addFont('/fonts/Raleway-SemiBold.ttf', 'Raleway', 'bold');
  // Note: You'll need to include Raleway font file in jsPDF
  try {
    doc.setFont("Raleway", "normal");
  } catch (error) {
    doc.setFont("helvetica", "normal"); // Fallback
  }

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = 25;
  const mainColor = "#1f7333"; // Green color
  const textColor = "#535252"; // Gray color

  // Function to add page background and border
  const addPageBackground = () => {
    // Add background color (outer color)
    doc.setFillColor(252, 241, 230); // #fcf1e6
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Add white content area with rounded border
    doc.setFillColor(255, 255, 255); // WHITE for inside border
    doc.setDrawColor(31, 115, 51); // #1f7333 border color
    doc.roundedRect(
      margin,
      margin,
      pageWidth - 2 * margin,
      pageHeight - 2 * margin,
      5,
      5,
      "FD"
    );
  };

  // Function to add footer (logo) to current page
  const addFooter = () => {
    try {
      const imgWidth = 40;
      const imgHeight = 15;
      const logoY = pageHeight - margin - 20;
      doc.addImage(
        LogoDotcom,
        "PNG",
        (pageWidth - imgWidth) / 2,
        logoY,
        imgWidth,
        imgHeight
      );
    } catch (error) {
      doc.setFontSize(10);
      doc.setTextColor(mainColor);
      doc.text("mesudar.com", pageWidth / 2, pageHeight - margin - 10, {
        align: "center",
      });
    }
  };

  // Add initial page background
  addPageBackground();

  // ===== TITLE =====
  doc.setFillColor(mainColor);
  doc.setDrawColor(mainColor);
  const titleWidth =
    (doc.getStringUnitWidth(`${selectedCategory} Checklist`) * 25) /
    doc.internal.scaleFactor;
  doc.roundedRect(
    (pageWidth - titleWidth - 20) / 2,
    yPos,
    titleWidth + 20,
    15,
    7.5,
    7.5,
    "FD"
  );
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.setFont("Raleway", "bold");
  doc.text(`${selectedCategory} Checklist`, pageWidth / 2, yPos + 10, {
    align: "center",
  });
  yPos += 30;

  // ===== CONTENT =====
  Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
    // Check page space before adding content
    if (yPos > pageHeight - 80) { // Increased margin to account for footer
      doc.addPage();
      yPos = margin + 20; // Start position for new page
      addPageBackground(); // Add background to new page
    }

    // Subcategory title - larger and bold
    doc.setFontSize(18);
    doc.setTextColor(mainColor);
    try {
      doc.setFont("Raleway", "bold");
    } catch (error) {
      doc.setFont("helvetica", "bold");
    }
    doc.text(subcategory, margin + 10, yPos);
    yPos += 9; // More space after section title

    // Tasks
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black
    try {
      doc.setFont("Raleway", "normal");
    } catch (error) {
      doc.setFont("helvetica", "normal");
    }

    tasks.forEach((task) => {
      if (yPos > pageHeight - 50) { // Check for page break
        doc.addPage();
        yPos = margin + 20;
        addPageBackground(); // Add background to new page
      }

      // Checkbox with rounded corners - Fixed alignment
      doc.setDrawColor(mainColor);
      doc.setLineWidth(0.5);
      // Adjusted checkbox position to align better with text baseline
      doc.roundedRect(margin + 10, yPos - 4, 4, 4, 1, 1, "S");

      // Task text - positioned to align with checkbox
      doc.text(task, margin + 20, yPos);
      yPos += 8;
    });

    yPos += 5; // Space between sections
  });

  // Add footer to all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    addFooter();
  }

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
    wsData.push([""]);

    Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
      wsData.push([subcategory]);
      tasks.forEach((task) => wsData.push([task]));
      wsData.push([""]);
    });

    wsData.push(["Brought to you by mesudar.com"]);

    const ws = utils.aoa_to_sheet(wsData);
    ws["!cols"] = [{ wch: 60 }];
    utils.book_append_sheet(wb, ws, "Checklist");
    writeFile(wb, `${selectedCategory}_Checklist.xlsx`);
  };

  const generateWord = async () => {
    const checkedTasks = getCheckedTasks();

    if (Object.keys(checkedTasks).length === 0) {
      alert("No tasks selected to export");
      return;
    }

    const paragraphs = [];

    // Title with green bottom border
    paragraphs.push(
      new Paragraph({
        text: `${selectedCategory} Checklist`,
        heading: "Heading1",
        alignment: "center",
        spacing: { after: 400 },
        border: {
          bottom: {
            color: "1F7333", // Your green color (#1f7333)
            space: 10,
            value: "single",
            size: 8,
          },
        },
      })
    );

    // Content sections
    Object.entries(checkedTasks).forEach(([subcategory, tasks]) => {
      // Subcategory heading
      paragraphs.push(
        new Paragraph({
          text: subcategory,
          heading: "Heading2",
          spacing: { before: 400, after: 200 },
          bold: true,
          color: "1F7333", // Green color
        })
      );

      // Tasks with bullet points
      tasks.forEach((task) => {
        paragraphs.push(
          new Paragraph({
            text: task,
            bullet: { level: 0 },
            spacing: { after: 100 },
            indent: { left: 720 },
          })
        );
      });

      // Space between sections
      paragraphs.push(
        new Paragraph({
          text: "",
          spacing: { after: 200 },
        })
      );
    });

    // Logo and footer
    try {
      // Convert your logo to base64 if not already
      const logoResponse = await fetch(LogoDotcom);
      const logoBlob = await logoResponse.blob();
      const logoBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(logoBlob);
      });

      paragraphs.push(
        new Paragraph({
          children: [
            new ImageRun({
              data: logoBase64,
              transformation: {
                width: 150, // Adjust as needed
                height: 40, // Adjust as needed
              },
              floating: {
                horizontalPosition: {
                  relative: HorizontalPositionRelativeFrom.PAGE,
                  align: HorizontalPositionAlign.CENTER,
                },
              },
            }),
          ],
          alignment: "center",
          spacing: { before: 600 },
        })
      );

      paragraphs.push(
        new Paragraph({
          text: "mesudar.com",
          alignment: "center",
          spacing: { before: 20 },
          color: "1F7333", // Green color
          size: 22,
        })
      );
    } catch (error) {
      console.error("Logo loading error:", error);
      // Fallback to text if logo fails
      paragraphs.push(
        new Paragraph({
          text: "mesudar.com",
          alignment: "center",
          spacing: { before: 600 },
          color: "1F7333", // Green color
          size: 22,
        })
      );
    }

    // Create document
    const doc = new Document({
      creator: "Brought to you by mesudar.com",
      title: `${selectedCategory} Checklist`,
      description: "Generated checklist for shul tasks",
      styles: {
        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",
            run: {
              font: "Helvetica Neue", // Or your preferred font
            },
            paragraph: {
              spacing: { line: 276 }, // 1.15 line spacing
            },
          },
        ],
      },
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
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
      <div className="border border-[#1f7333] shadow-md p-6 rounded-2xl bg-white md:max-w-[80%] w-full m-auto">
        <div className="bg-[#1f7333] text-white font-semibold rounded-full py-2 px-6 mx-auto text-center w-fit mb-2 text-lg shadow-sm">
          {selectedCategory} Checklist
        </div>
        {Object.entries(checkedTasks).map(([subcategory, tasks], index) => (
          <div key={index} className="mb-6">
            <p className="text-[#1f7333] font-bold mb-2 text-lg">
              {subcategory}
            </p>
            {tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 border-2 border-[#1f7333] rounded-[5px] flex items-center justify-center text-xs text-black"></div>
                <span className="text-gray-800 text-sm">{task}</span>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <img src={LogoDotcom} alt="Mesudar Logo" className="h-12 w-auto" />
        </div>
        {/* <div className="text-center text-teal-600 mt-8">
          <p className="font-semibold">mesudar.com</p>
          <p className="text-sm">making gabboim's lives easier</p>
        </div> */}
      </div>
    );
  };

  return (
    <div className="bg-[#fcf1e6] py-10 md:px-10 px-3 rounded-xl">
      <h1 className="text-center mb-3 sm:text-[30px] text-[25px] font-semibold  text-[#535252]">
        Your Checklist is ready!
      </h1>
      {/* <div className="m-auto mb-10 mt-2">
           <Link to="/admin" className="flex items-center">
             <img src={Logo} alt="logo" className="h-[40px]   m-auto" />
            </Link>
        </div> */}
      {/* <div className="flex justify-center mb-6">
            <img src={Logo} alt="Mesudar Logo" className="h-16 w-auto" />
          </div> */}

      {renderPreview()}

      <div className="mt-8 flex flex-col gap-4 max-w-[600px] m-auto">
        <button
          onClick={generatePDF}
          className="bg-[#1f7333] hover:bg-[#1f733399] text-white py-3 px-5 rounded-full shadow-md transition w-full"
          disabled={Object.keys(getCheckedTasks()).length === 0}
        >
          Download PDF
        </button>
        <div className="flex gap-4 w-full">
          <button
            onClick={generateWord}
            className="bg-[#1f7333] hover:bg-[#1f733399] text-white py-3 px-5 rounded-full shadow-md transition w-full"
            disabled={Object.keys(getCheckedTasks()).length === 0}
          >
            Download Word File
          </button>
          <button
            onClick={generateExcel}
            className="bg-[#1f7333] hover:bg-[#1f733399] text-white py-3 px-5 rounded-full shadow-md transition w-full"
            disabled={Object.keys(getCheckedTasks()).length === 0}
          >
            Download Excel File
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onBack}
          className="border-2 border-[#1f7333] text-[#1f7333] font-semibold rounded-full px-6 py-2 hover:bg-[#1f7333] hover:text-[#fff] transition-colors"
        >
          Back
        </button>
        <button
          onClick={onStartOver}
          className="text-[#1f7333] border-2 border-[#1f7333] py-2 px-6 rounded-full hover:bg-[#1f7333] hover:text-[#fff] transition"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};
