// src/components/dashboard/RoadmapTable.jsx
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  BookOpen, 
  Download,
  Edit2,
  Save,
  X
} from 'lucide-react';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const RoadmapTable = ({ roadmap, editable = false }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [editingCell, setEditingCell] = useState(null);
  const [notes, setNotes] = useState({});

  const toggleRow = (index) => {
    setExpandedRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleEditCell = (rowIndex, colName) => {
    setEditingCell(`${rowIndex}-${colName}`);
  };

  const handleSaveNote = (rowIndex) => {
    toast.success('Note saved successfully');
    setEditingCell(null);
  };

  const handleExportPDF = () => {
    toast.success('Exporting roadmap as PDF...');
    // PDF export logic here
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-primary-bg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">{roadmap.title}</h3>
          <p className="text-text-secondary mt-1">{roadmap.description}</p>
        </div>
        <div className="flex items-center gap-3">
          {editable && (
            <Button
              variant="secondary"
              onClick={handleExportPDF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary-bg border-b border-border">
              <th className="py-4 px-6 text-left text-sm font-semibold text-text-primary">
                Year/Phase
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-text-primary">
                Key Milestones
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-text-primary">
                Skills
              </th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-text-primary">
                Resources
              </th>
              {editable && (
                <th className="py-4 px-6 text-left text-sm font-semibold text-text-primary">
                  Notes
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {roadmap.phases?.map((phase, index) => (
              <React.Fragment key={index}>
                <tr className={`border-b border-border hover:bg-secondary-bg/50 transition-colors ${
                  expandedRows[index] ? 'bg-secondary-bg/30' : ''
                }`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleRow(index)}
                        className="p-1 hover:bg-border rounded"
                      >
                        {expandedRows[index] ? (
                          <ChevronDown className="h-4 w-4 text-text-secondary" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-text-secondary" />
                        )}
                      </button>
                      <span className="font-medium text-text-primary">{phase.year}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {phase.milestones.slice(0, 2).map((milestone, idx) => (
                        <div key={idx} className="text-text-secondary">
                          • {milestone}
                        </div>
                      ))}
                      {phase.milestones.length > 2 && (
                        <div className="text-text-secondary text-sm">
                          + {phase.milestones.length - 2} more
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1.5">
                      {phase.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary-bg text-text-secondary text-xs rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {phase.resources.slice(0, 2).map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-black underline transition-colors block text-sm"
                        >
                          {resource.title}
                        </a>
                      ))}
                    </div>
                  </td>
                  {editable && (
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {editingCell === `${index}-notes` ? (
                          <div className="flex-1 flex gap-2">
                            <textarea
                              value={notes[index] || ''}
                              onChange={(e) => setNotes(prev => ({
                                ...prev,
                                [index]: e.target.value
                              }))}
                              className="flex-1 px-3 py-2 border border-accent rounded text-sm"
                              rows={2}
                            />
                            <button
                              onClick={() => handleSaveNote(index)}
                              className="p-1 hover:bg-border rounded"
                            >
                              <Save className="h-4 w-4 text-text-secondary" />
                            </button>
                            <button
                              onClick={() => setEditingCell(null)}
                              className="p-1 hover:bg-border rounded"
                            >
                              <X className="h-4 w-4 text-text-secondary" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="text-text-secondary text-sm">
                              {notes[index] || 'Add notes...'}
                            </span>
                            <button
                              onClick={() => handleEditCell(index, 'notes')}
                              className="p-1 hover:bg-border rounded ml-2"
                            >
                              <Edit2 className="h-4 w-4 text-text-secondary" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>

                {/* Expanded Details */}
                {expandedRows[index] && (
                  <tr className="bg-secondary-bg/30">
                    <td colSpan={editable ? 5 : 4} className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">
                            Detailed Milestones
                          </h4>
                          <ul className="space-y-2">
                            {phase.milestones.map((milestone, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-accent mt-2" />
                                <span className="text-text-secondary">{milestone}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-text-primary mb-2">
                            All Resources
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {phase.resources.map((resource, idx) => (
                              <a
                                key={idx}
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-primary-bg transition-colors"
                              >
                                <BookOpen className="h-4 w-4 text-text-secondary" />
                                <div>
                                  <div className="font-medium text-text-primary text-sm">
                                    {resource.title}
                                  </div>
                                  <div className="text-text-secondary text-xs">
                                    {resource.type} • {resource.duration}
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="p-6 border-t border-border bg-secondary-bg">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium text-text-primary">Summary</h4>
            <p className="text-text-secondary text-sm mt-1">
              {roadmap.summary || 'Complete all phases to achieve your career goals'}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-text-primary">
              {roadmap.phases?.length || 4} Phases
            </div>
            <div className="text-text-secondary text-sm">
              Estimated duration: {roadmap.duration || '4 years'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapTable;