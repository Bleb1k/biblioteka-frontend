import { route } from 'preact-router'
import AddRecord from 'components/AddRecord'

export default function () {
  const switchTab = (event: Event) =>
    route(
      ((event.currentTarget as HTMLElement).textContent || '').toLowerCase(),
      true
    )

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Biblioteka</a>
      </div>
      <div className="navbar-center">
        <div
          role="tablist"
          className="tabs tabs-bordered"
          onClick={(e) =>
            [0, 1, 2].forEach((a) => {
              e.currentTarget.children[a].classList.remove('tab-active')
              ;(e.target as HTMLInputElement).classList.add('tab-active')
            })
          }
        >
          <a onClick={switchTab} className="tab">
            Users
          </a>
          <a onClick={switchTab} className="tab">
            Records
          </a>
          <a onClick={switchTab} className="tab">
            Books
          </a>
        </div>
      </div>
      <div className="navbar-end">
        <div className="flex items-stretch">
          {/* add other buttons here */}
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn"
            >
              Add stuff
            </div>
            <div
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box"
            >
              <AddRecord />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
