// src/components/dashboard/BranchCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Briefcase, Target, ArrowRight } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardFooter } from '../common/Card';
import Button from '../common/Button';

const BranchCard = ({ branch }) => {
  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-secondary-bg text-text-secondary';
    }
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle>{branch.name}</CardTitle>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(branch.difficulty)}`}>
                {branch.difficulty || 'Medium'}
              </span>
            </div>
            <CardDescription className="line-clamp-3">
              {branch.overview || branch.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <div className="mt-4 space-y-3 flex-1">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-text-secondary" />
          <span className="text-sm text-text-secondary">Career Paths:</span>
          <span className="text-sm font-medium text-text-primary">
            {branch.careerPaths?.length || 5}+
          </span>
        </div>

        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-text-secondary" />
          <span className="text-sm text-text-secondary">Demand:</span>
          <span className="text-sm font-medium text-text-primary">
            {branch.demand || 'High'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-text-secondary" />
          <span className="text-sm text-text-secondary">Avg. Salary:</span>
          <span className="text-sm font-medium text-text-primary">
            {branch.avgSalary || '₹8-15 LPA'}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Key Skills:</h4>
        <div className="flex flex-wrap gap-1.5">
          {branch.keySkills?.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary-bg text-text-secondary text-xs rounded"
            >
              {skill}
            </span>
          ))}
          {branch.keySkills?.length > 4 && (
            <span className="px-2 py-1 text-text-secondary text-xs">
              +{branch.keySkills.length - 4} more
            </span>
          )}
        </div>
      </div>

      <CardFooter className="mt-6 pt-6 border-t border-border">
        <div className="flex gap-3 w-full">
          <Link to={`/branch/${branch._id || branch.id}`} className="flex-1">
            <Button variant="primary" className="w-full group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BranchCard;