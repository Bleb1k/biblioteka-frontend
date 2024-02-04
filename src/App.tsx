import { Suspense } from 'preact/compat'
import Router, { Route } from 'preact-router'
import UserList from 'components/UserList'

export default function () {
  return (
    <div>
      <Navbar />
      <div className="container max-w-2xl mx-auto p-10">
        <Suspense fallback={<p>Loading...</p>}>
          <Router>
            <Route path="/users" component={UserList} />
          </Router>
        </Suspense>
      </div>
    </div>
  )
}

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Biblioteka</a>
      </div>
      <div className="navbar-center">
        <div role="tablist" className="tabs tabs-bordered">
          <a href="users" role="tab" className="tab tab-active">
            Users
          </a>
          <a href="#" role="tab" className="tab">
            Tab 2
          </a>
          <a href="#" role="tab" className="tab">
            Tab 3
          </a>
        </div>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost">Button</a>
      </div>
    </div>
  )
}
