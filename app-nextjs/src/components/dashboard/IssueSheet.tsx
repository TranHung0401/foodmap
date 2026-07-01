import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Issue, IssueStatus } from "@/types/issue";

interface IssueSheetProps {
  issue: Issue | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, newStatus: IssueStatus, newNotes: string) => void;
}

export function IssueSheet({ issue, open, onOpenChange, onSave }: IssueSheetProps) {
  const [status, setStatus] = useState<IssueStatus>("Chờ xử lý");
  const [devNotes, setDevNotes] = useState("");

  useEffect(() => {
    if (issue) {
      setStatus(issue.status);
      setDevNotes(issue.devNotes || "");
    }
  }, [issue]);

  if (!issue) return null;

  const handleSave = () => {
    onSave(issue.id, status, devNotes);
    toast.success(`Đã cập nhật issue #${issue.number}`);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl flex items-start gap-2 leading-tight">
            <span className="text-muted-foreground font-normal">#{issue.number}</span>
            <span>{issue.title}</span>
          </SheetTitle>
          <SheetDescription className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary">{issue.area}</Badge>
            <Badge variant="outline">{issue.page}</Badge>
            <Badge variant="outline" className="border-red-200 bg-red-50 text-red-700">{issue.priority}</Badge>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2 text-foreground">Mô tả vấn đề</h4>
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              {issue.description || "Không có mô tả chi tiết."}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Dev Section</h4>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Tiến độ xử lý</label>
              <Select value={status} onValueChange={(v) => setStatus(v as IssueStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                  <SelectItem value="Đang sửa">Đang sửa</SelectItem>
                  <SelectItem value="Đã sửa">Đã sửa</SelectItem>
                  <SelectItem value="Đã kiểm tra">Đã kiểm tra (QA)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Ghi chú của Dev</label>
              <Textarea 
                placeholder="Ghi chú nguyên nhân lỗi, cách fix, PR link..." 
                value={devNotes}
                onChange={(e) => setDevNotes(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSave} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
              💾 Lưu thay đổi
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
