"use client";

import { Issue, BookingStatus } from "@/types/issue";
import { IssueCard } from "./IssueCard";

interface AreaSectionProps {
  area: string;
  issues: Issue[];
  expandedIssueIds: Record<string, boolean>;
  onToggleIssue: (id: string) => void;
  onSave: (id: string, newStatus: BookingStatus, newNotes: string, newImages: string[]) => void;
}

function groupByPage(issues: Issue[]) {
  const map: Record<string, Issue[]> = {};
  for (const issue of issues) {
    if (!map[issue.page]) map[issue.page] = [];
    map[issue.page].push(issue);
  }
  return map;
}

export function AreaSection({ area, issues, expandedIssueIds, onToggleIssue, onSave }: AreaSectionProps) {
  const byPage = groupByPage(issues);

  return (
    <section style={{ marginTop: 24 }}>
      {/* Area header */}
      <h2
        style={{
          fontSize: 16,
          color: "#fff",
          background: "#111",
          margin: "0 0 12px",
          padding: "10px 16px",
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontWeight: 700,
        }}
      >
        📍 {area}
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#aaa",
            background: "#222",
            padding: "2px 9px",
            borderRadius: 999,
            border: "1px solid #333",
          }}
        >
          {issues.length} vấn đề
        </span>
      </h2>

      {/* Pages within area */}
      {Object.entries(byPage).map(([page, pageIssues]) => (
        <div key={page} style={{ margin: "0 0 12px 0" }}>
          <h3
            style={{
              fontSize: 14,
              color: "#333",
              margin: "12px 0 8px",
              paddingBottom: 6,
              borderBottom: "1px solid #e5e5e5",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontWeight: 600,
            }}
          >
            {page}
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 500,
                color: "#888",
                background: "#f4f4f5",
                padding: "1px 8px",
                borderRadius: 999,
                border: "1px solid #e5e5e5",
              }}
            >
              {pageIssues.length}
            </span>
          </h3>

          {pageIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              isOpen={!!expandedIssueIds[issue.id]}
              onToggle={() => onToggleIssue(issue.id)}
              onSave={onSave}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
