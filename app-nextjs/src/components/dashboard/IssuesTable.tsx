import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Issue } from "@/types/issue";

interface IssuesTableProps {
  issues: Issue[];
  onRowClick: (issue: Issue) => void;
}

export function IssuesTable({ issues, onRowClick }: IssuesTableProps) {
  const getPriorityColor = (p: string) => {
    switch (p) {
      case "Cao": return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Trung bình": return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "Thấp": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "Chờ xử lý": return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200";
      case "Đang sửa": return "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200";
      case "Đã sửa": return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200";
      case "Đã kiểm tra": return "bg-violet-100 text-violet-800 hover:bg-violet-100 border-violet-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  if (issues.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground bg-white rounded-lg border border-dashed">
        Không tìm thấy issue nào phù hợp với bộ lọc.
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[80px]">#ID</TableHead>
            <TableHead className="w-[120px]">Khu vực</TableHead>
            <TableHead className="w-[120px]">Trang</TableHead>
            <TableHead>Vấn đề</TableHead>
            <TableHead className="w-[120px]">Nhóm</TableHead>
            <TableHead className="w-[120px]">Ưu tiên</TableHead>
            <TableHead className="w-[140px]">Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow 
              key={issue.id} 
              onClick={() => onRowClick(issue)}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">#{issue.number}</TableCell>
              <TableCell>{issue.area}</TableCell>
              <TableCell className="text-muted-foreground">{issue.page}</TableCell>
              <TableCell className="font-medium text-foreground line-clamp-1 border-none">{issue.title}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {issue.groupType.split(',').map(g => (
                    <Badge key={g} variant="secondary" className="text-[10px] py-0">{g}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`border-none ${getPriorityColor(issue.priority)}`}>
                  {issue.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(issue.status)}>
                  {issue.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
