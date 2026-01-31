// src/components/dashboard/DegreeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, Users } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardFooter } from '../common/Card';
import Button from '../common/Button';

const DegreeCard = ({ degree }) => {
  const stats = [
    { icon: BookOpen, label: 'Branches', value: degree.branchesCount || 12 },
    { icon: Calendar, label: 'Duration', value: `${degree.duration || 4} years` },
    { icon: Users, label: 'Popularity', value: `${degree.popularity || 85}%` },
  ];

  return (
    <Card hoverable className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{degree.name}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">
              {degree.description}
            </CardDescription>
          </div>
          <div className="h-12 w-12 rounded-lg bg-secondary-bg flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-text-secondary" />
          </div>
        </div>
      </CardHeader>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-1">
              <stat.icon className="h-4 w-4 text-text-secondary" />
            </div>
            <div className="text-lg font-semibold text-text-primary">
              {stat.value}
            </div>
            <div className="text-xs text-text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-text-primary">Top Branches:</h4>
        <div className="flex flex-wrap gap-2">
          {degree.topBranches?.slice(0, 3).map((branch, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary-bg text-text-secondary text-xs rounded"
            >
              {branch}
            </span>
          ))}
        </div>
      </div>

      <CardFooter className="mt-auto pt-6">
        <Link to={`/degree/${degree._id || degree.id}`} className="w-full">
          <Button variant="secondary" className="w-full group">
            Explore Branches
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DegreeCard;