import type { UserSubmission } from "../models/submission/submissionModel";

const STORAGE_KEY = "userSubmissions";

// Read from localStorage
export const readSubmissions = (): UserSubmission[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as UserSubmission[]) : [];
  } catch (err) {
    console.error("Error reading submissions from localStorage:", err);
    return [];
  }
};

// Write to localStorage
export const saveSubmissions = (submissions: UserSubmission[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (err) {
    console.error("Error saving submissions to localStorage:", err);
  }
};

// Add a submission to localStorage
export const addSubmission = (submission: UserSubmission): void => {
  const submissions = readSubmissions();
  submissions.push(submission);
  saveSubmissions(submissions);
};
