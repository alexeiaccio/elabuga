import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

function Pagination({ data }) {
  const { currentPage, numPages } = data

  return (
    <div
      css={css`
        ${tw([
          'flex',
          'flex-row',
          'flex-no-wrap',
          'items-baseline',
          'justify-center',
          'text-grey-light',
          'text-xl',
        ])};
        & a {
          ${tw(['no-underline', 'text-black'])};
        }
        & > * {
          ${tw(['inline-block', 'text-center', 'w-1/12'])};
        }
      `}
    >
      <span>{currentPage > 3 ? <Link to="/histories">1</Link> : <span />}</span>
      {currentPage - 3 > 0 ? <span>...</span> : <span />}
      {currentPage - 2 > 0 ? (
        <Link to={`/histories/${currentPage === 3 ? '' : currentPage - 2}`}>
          {currentPage - 2}
        </Link>
      ) : (
        <span />
      )}
      {currentPage - 1 > 0 ? (
        <Link to={`/histories/${currentPage === 2 ? '' : currentPage - 1}`}>
          {currentPage - 1}
        </Link>
      ) : (
        <span />
      )}
      <span
        css={css`
          color: #f0c41b;
        `}
      >
        {currentPage}
      </span>
      {currentPage + 1 <= numPages ? (
        <Link to={`/histories/${currentPage + 1}`}>{currentPage + 1}</Link>
      ) : (
        <span />
      )}
      {currentPage + 2 <= numPages ? (
        <Link to={`/histories/${currentPage + 2}`}>{currentPage + 2}</Link>
      ) : (
        <span />
      )}
      {currentPage + 3 < numPages ? <span>...</span> : <span />}
      <span>
        {currentPage + 3 < numPages ? (
          <Link to={`/histories/${numPages}`}>{numPages}</Link>
        ) : (
          <span />
        )}
      </span>
    </div>
  )
}

Pagination.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Pagination
