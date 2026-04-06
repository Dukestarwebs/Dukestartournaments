"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, Send, CheckCircle } from "lucide-react";

export default function AdminPaymentsPage() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [tournamentName, setTournamentName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handlePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // In a real app, this would call a Netlify Function that securely calls the Julypay API
    try {
      // Mocking the API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const payload = {
        customer_phone: phone,
        amount: parseInt(amount),
        description: `Champion of ${tournamentName} tournament`,
        customer_name: customerName
      };

      console.log("Executing payout:", payload);
      setStatus("Payout executed successfully via Julypay!");
      
      // Reset form
      setPhone("");
      setAmount("");
      setTournamentName("");
      setCustomerName("");
    } catch (error) {
      setStatus("Error executing payout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Payments & Payouts</h1>
          <p className="text-[var(--color-text-secondary)]">Manage Julypay transactions and execute winner payouts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-[var(--color-accent-deep)] shadow-[0_0_20px_rgba(31,60,136,0.1)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[var(--color-comp-orange)]" />
                Execute Payout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayout} className="space-y-4">
                {status && (
                  <div className="p-3 bg-[var(--color-accent-deep)]/20 border border-[var(--color-accent-bright)] text-[var(--color-accent-bright)] rounded-md flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {status}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="customerName">Winner Name</Label>
                  <Input 
                    id="customerName" 
                    placeholder="John Doe" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Winner Phone (Julypay)</Label>
                  <Input 
                    id="phone" 
                    placeholder="256701234567" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Prize Amount (UGX)</Label>
                  <Input 
                    id="amount" 
                    type="number" 
                    placeholder="50000" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tournamentName">Tournament Name</Label>
                  <Input 
                    id="tournamentName" 
                    placeholder="AI Studio Hackathon" 
                    value={tournamentName}
                    onChange={(e) => setTournamentName(e.target.value)}
                    required 
                  />
                </div>
                <div className="pt-2">
                  <p className="text-xs text-[var(--color-text-muted)] mb-4">
                    Description will be formatted as: <br/>
                    <span className="text-[var(--color-text-secondary)] italic">&quot;Champion of [Tournament Name] tournament&quot;</span>
                  </p>
                  <Button 
                    type="submit" 
                    className="w-full bg-[var(--color-comp-orange)] hover:bg-[var(--color-comp-highlight)]"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : (
                      <><Send className="w-4 h-4 mr-2" /> Execute Payout via Julypay</>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-[var(--color-border-default)]">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-[var(--color-border-default)] rounded-lg bg-[var(--color-base-primary)]/50">
                <Wallet className="w-12 h-12 text-[var(--color-border-default)] mb-4" />
                <p className="text-[var(--color-text-secondary)]">No recent transactions.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
