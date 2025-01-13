export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Applications</h3>
          </div>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            +0% from last month
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Applications</h3>
          </div>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            +0% from last month
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Interviews</h3>
          </div>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            +0% from last month
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Offers</h3>
          </div>
          <div className="text-2xl font-bold">0</div>
          <p className="text-xs text-muted-foreground">
            +0% from last month
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[450px] p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Application Status</h3>
            </div>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              No data to display
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[450px] p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">Recent Activity</h3>
            </div>
            <div className="h-[400px] flex items-center justify-center text-muted-foreground">
              No recent activity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
