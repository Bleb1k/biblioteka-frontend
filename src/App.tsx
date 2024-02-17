import { Route, Router } from 'preact-router'
import { Suspense } from 'preact/compat'
import AddRecord from 'components/AddRecord'
import BookList from 'components/BookList'
import Navbar from 'components/Navbar'
import RecordList from 'components/RecordList'
import UserList from 'components/UserList'

export default function () {
  return (
    <div>
      <Navbar />
      <div className="container max-w-2xl mx-auto p-10 content-center">
        <Suspense fallback={<p>Loading...</p>}>
          <AddRecord />
          <Router>
            <Route path="/users" component={UserList} />
            <Route path="/records" component={RecordList} />
            <Route path="/books" component={BookList} />
            <Route default component={UserList} />
          </Router>
        </Suspense>
      </div>
    </div>
  )
}
