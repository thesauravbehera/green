import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card } from "../ui/card";
import { Bell, Droplet, Scissors, RefreshCw, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface CareRemindersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CareRemindersModal({ isOpen, onClose }: CareRemindersModalProps) {
  const [reminders, setReminders] = useState([
    { id: 1, plant: "Balcony Tomatoes", task: "Water", frequency: "Daily", time: "8:00 AM" },
    { id: 2, plant: "Basil", task: "Fertilize", frequency: "Weekly", time: "10:00 AM" }
  ]);

  const handleAddReminder = () => {
    toast.success("🌱 Reminder added successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Care Reminders & Schedule
          </DialogTitle>
          <DialogDescription>
            Never forget to water, fertilize, or prune your balcony garden plants
          </DialogDescription>
        </DialogHeader>

        {/* Existing Reminders */}
        <div className="space-y-3 mb-6">
          <h4 className="font-medium">Active Reminders</h4>
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="p-4 border-2 border-primary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {reminder.task === "Water" && <Droplet className="w-5 h-5 text-blue-500" />}
                  {reminder.task === "Fertilize" && <RefreshCw className="w-5 h-5 text-green-500" />}
                  {reminder.task === "Prune" && <Scissors className="w-5 h-5 text-orange-500" />}
                  <div>
                    <p className="font-medium">{reminder.plant}</p>
                    <p className="text-sm text-muted-foreground">
                      {reminder.task} - {reminder.frequency} at {reminder.time}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add New Reminder */}
        <div className="space-y-4 p-4 bg-secondary/30 rounded-xl">
          <h4 className="font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Reminder
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Plant Name</Label>
              <Input placeholder="e.g., Balcony Tomatoes" />
            </div>
            <div>
              <Label>Care Task</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="fertilize">Fertilize</SelectItem>
                  <SelectItem value="prune">Prune</SelectItem>
                  <SelectItem value="repot">Repot</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="every2days">Every 2 Days</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time</Label>
              <Input type="time" defaultValue="08:00" />
            </div>
          </div>

          <Button onClick={handleAddReminder} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Reminder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
