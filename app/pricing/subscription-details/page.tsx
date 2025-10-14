'use client'
import { useSubscription } from '@clerk/nextjs/experimental'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, AlertTriangle, CalendarDays, CreditCard, Gift, Loader2 } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import Loading from '@/app/components/common/ui/Loading'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'

function SubscriptionDetails() {
  const { data: subscription, isLoading } = useSubscription()
  const router = useRouter()
  
  if (isLoading) {
    return  <Card className="w-full max-w-md p-6 shadow-sm border rounded-2xl flex flex-col justify-center items-center space-y-4">
    <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
    <p className="text-muted-foreground text-sm">
      Loading your subscription details...
    </p>
  </Card>
  }

  if (!subscription) {
    return <div className="flex h-[70vh] items-center justify-center">
    <Card className="max-w-md text-center shadow-lg p-6">
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="rounded-full bg-muted p-3">
          <AlertCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">No active subscription</h3>
        <p className="text-muted-foreground text-sm">
          You don’t have an active plan at the moment. Start your subscription to access all features.
        </p>
        <Button className="mt-2" onClick={() => router.push("/pricing")}>
          View Plans
        </Button>
      </CardContent>
    </Card>
  </div>
  }

  const statusColor =
    subscription.status === "active"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
      : subscription.status === "past_due"
      ? "bg-red-100 text-red-700 border border-red-200"
      : "bg-muted text-muted-foreground border"

  const item = subscription.subscriptionItems?.[0]
  const plan = item?.plan

      console.log("data----->", subscription);

      return (
        <Card className="w-full max-w-xl mx-auto shadow-sm border rounded-2xl bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Subscription Details
              </CardTitle>
              <Badge className={cn(statusColor, "px-3 py-1 rounded-full capitalize")}>
                {subscription.status}
              </Badge>
            </div>
          </CardHeader>
    
          <CardContent className="space-y-6 text-sm">
            {/* Plan Section */}
            {plan && (
              <div className="p-4 rounded-xl bg-muted/40 border flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-base">{plan.name} Plan</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                  {item.isFreeTrial && (
                    <div className="flex items-center gap-2 mt-2 text-amber-600 text-xs font-medium">
                      <Gift className="h-4 w-4" />
                      <span>Free Trial Active ({plan.freeTrialDays} days)</span>
                    </div>
                  )}
                </div>
                <span className="font-semibold text-foreground">
                  ${plan.annualMonthlyFee.amountFormatted}/mo
                </span>
              </div>
            )}
    
            {/* Active Since */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>
                Active since{" "}
                <span className="text-foreground font-medium">
                  {new Date(subscription.activeAt).toLocaleDateString()}
                </span>
              </span>
            </div>
    
            {/* Past Due Warning */}
            {subscription.pastDueAt && (
              <Alert variant="destructive" className="border-red-300 bg-red-50/80">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Past Due</AlertTitle>
                <AlertDescription>
                  Since {new Date(subscription.pastDueAt).toLocaleDateString()}
                </AlertDescription>
              </Alert>
            )}
    
            {/* Next Payment */}
            {subscription.nextPayment && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium text-base">Next Payment</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Amount:{" "}
                    <span className="text-foreground font-semibold">
                      ${subscription.nextPayment.amount.amountFormatted}
                    </span>
                  </p>
                  <p className="text-muted-foreground">
                    Due:{" "}
                    <span className="text-foreground font-semibold">
                      {new Date(subscription.nextPayment.date).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </>
            )}
    
            {/* Subscription Items */}
            {subscription.subscriptionItems?.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-medium text-base mb-3">Subscription Items</h3>
                  <ul className="space-y-2">
                    {subscription.subscriptionItems.map((item: any) => (
                      <li
                        key={item.id}
                        className="p-3 border rounded-xl bg-muted/30 flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">{item.plan.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {item.planPeriod} · {item.status}
                          </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ${item.plan.annualMonthlyFee.amountFormatted}/mo
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )
    }

export default function Page() {
  const { data, isLoading, error, isFetching, revalidate } = useSubscription()
  if (error) {
    return (
      <SubscriptionError error={error} revalidate={revalidate} />
    )
  }

  return (
       <SubscriptionStatus isLoading={isLoading} isFetching={isFetching} data={data} />
  )
}

function SubscriptionStatus({ isLoading, isFetching, data }: any) {
  return (
    <div className="subscription-status flex justify-center items-center min-h-[300px]">
      {isLoading ? (
        <Card className="w-full max-w-md p-6 shadow-sm border rounded-2xl flex flex-col justify-center items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
          <p className="text-muted-foreground text-sm">
            Loading your subscription details...
          </p>
        </Card>
      ) : (
        <>
          <div className="status-indicator text-xs text-muted-foreground flex justify-center items-center gap-2 mb-2">
            {isFetching && (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                <span>Refreshing...</span>
              </>
            )}
          </div>

          {data ? (
            <SubscriptionDetails />
          ) : (
            <Card className="w-full max-w-md p-6 text-center border-dashed border-muted-foreground/30">
              <CardContent>
                <p className="text-muted-foreground">No active subscription</p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}


function SubscriptionError({ error, revalidate }: any) {
  return (
    <Card className="w-full max-w-md mx-auto border-red-200 bg-red-50/50 dark:bg-red-950/20 rounded-2xl shadow-sm">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-10 w-10 text-red-500" />
          <h3 className="text-lg font-semibold text-red-600">
            Failed to load subscription
          </h3>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm">
          {error?.message || "An unexpected error occurred while fetching your subscription details."}
        </p>
        <Button
          variant="outline" 
          className="mt-2 border-red-300 text-red-600 hover:bg-red-100" 
          onClick={revalidate}
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  )
}