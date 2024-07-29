import PropTypes from "prop-types";

const Table = ({ name, position, goals, assists, played, dept, prog }) => {
  return (
    <div className="mx-auto">
      <div className="py-8 px-4 md:px-8">
        <div className="-mx-4 sm:-mx-8 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Player Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Goals
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Assists
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Matches Played
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Programme
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{name}</p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      {position}
                    </p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      {goals}
                    </p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      {assists}
                    </p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap text-center">
                      {played}
                    </p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{dept}</p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{prog}</p>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="px-5 py-5 bg-white border-t">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 5 players
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  goals: PropTypes.string.isRequired,
  assists: PropTypes.string.isRequired,
  played: PropTypes.string.isRequired,
  dept: PropTypes.string.isRequired,
  prog: PropTypes.string.isRequired,
};

export default Table;
