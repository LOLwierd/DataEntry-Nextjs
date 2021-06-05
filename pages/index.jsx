import React from 'react';
import dynamic from 'next/dynamic';
const PrivateRoute = dynamic(() => import('../utils/PrivateRoute'), {
	ssr: false,
});
export default function Home() {
	return (
		<PrivateRoute>
			<div id="search">
				<input type="text" placeholder="SPU-ID" />
				<button className="grey">Advanced</button>
				<button className="primary">Search</button>
			</div>
			<div id="results">
				<table>
					<thead>
						<tr>
							<th>SPU ID</th>
							<th>Batch</th>
							<th>Full Name</th>
							<th>Sem</th>
							<th>Seat No</th>
							<th>Type</th>
							<th>Month</th>
							<th>Year</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>180410107088</td>
							<td>2020-21</td>
							<td>Akshar Big Brain</td>
							<td>7</td>
							<td>E123456</td>
							<td>Regular</td>
							<td>JAN</td>
							<td>2021</td>
							<td>
								<button type="button" aria-describedby="tooltip" id="view">
									<svg
										aria-hidden="true"
										data-prefix="fas"
										data-icon="eye"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										class="svg-inline--fa fa-eye fa-w-18 fa-3x"
									>
										<path
											fill="currentColor"
											d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 000 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 000-29.19zM288 400a144 144 0 11144-144 143.93 143.93 0 01-144 144zm0-240a95.31 95.31 0 00-25.31 3.79 47.85 47.85 0 01-66.9 66.9A95.78 95.78 0 10288 160z"
										/>
									</svg>
								</button>
								<button type="button" aria-describedby="tooltip" id="generate">
									<svg
										aria-hidden="true"
										data-prefix="fas"
										data-icon="file-export"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										class="svg-inline--fa fa-file-export fa-w-18 fa-3x"
									>
										<path
											fill="currentColor"
											d="M384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128zM571 308l-95.7-96.4c-10.1-10.1-27.4-3-27.4 11.3V288h-64v64h64v65.2c0 14.3 17.3 21.4 27.4 11.3L571 332c6.6-6.6 6.6-17.4 0-24zm-379 28v-32c0-8.8 7.2-16 16-16h176V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V352H208c-8.8 0-16-7.2-16-16z"
										/>
									</svg>
								</button>
							</td>
						</tr>
						<tr>
							<td>180410107088</td>
							<td>2020-21</td>
							<td>Akshar Big Brain</td>
							<td>7</td>
							<td>E123456</td>
							<td>Regular</td>
							<td>JAN</td>
							<td>2021</td>
							<td>
								<button type="button" aria-describedby="tooltip" id="view">
									<svg
										aria-hidden="true"
										data-prefix="fas"
										data-icon="eye"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										class="svg-inline--fa fa-eye fa-w-18 fa-3x"
									>
										<path
											fill="currentColor"
											d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 000 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 000-29.19zM288 400a144 144 0 11144-144 143.93 143.93 0 01-144 144zm0-240a95.31 95.31 0 00-25.31 3.79 47.85 47.85 0 01-66.9 66.9A95.78 95.78 0 10288 160z"
										/>
									</svg>
								</button>
								<button type="button" aria-describedby="tooltip" id="generate">
									<svg
										aria-hidden="true"
										data-prefix="fas"
										data-icon="file-export"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										class="svg-inline--fa fa-file-export fa-w-18 fa-3x"
									>
										<path
											fill="currentColor"
											d="M384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128zM571 308l-95.7-96.4c-10.1-10.1-27.4-3-27.4 11.3V288h-64v64h64v65.2c0 14.3 17.3 21.4 27.4 11.3L571 332c6.6-6.6 6.6-17.4 0-24zm-379 28v-32c0-8.8 7.2-16 16-16h176V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V352H208c-8.8 0-16-7.2-16-16z"
										/>
									</svg>
								</button>
							</td>
						</tr>
						<tr>
							<td>180410107088</td>
							<td>2020-21</td>
							<td>Akshar Big Brain</td>
							<td>7</td>
							<td>E123456</td>
							<td>Regular</td>
							<td>JAN</td>
							<td>2021</td>
							<td>
								<button type="button" aria-describedby="tooltip" id="view">
									<svg
										aria-hidden="true"
										data-prefix="fas"
										data-icon="eye"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										class="svg-inline--fa fa-eye fa-w-18 fa-3x"
									>
										<path
											fill="currentColor"
											d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 000 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 000-29.19zM288 400a144 144 0 11144-144 143.93 143.93 0 01-144 144zm0-240a95.31 95.31 0 00-25.31 3.79 47.85 47.85 0 01-66.9 66.9A95.78 95.78 0 10288 160z"
										/>
									</svg>
								</button>
								<button type="button" aria-describedby="tooltip" id="generate">
									<svg
										aria-hidden="true"
										data-prefix="fas"
										data-icon="file-export"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										class="svg-inline--fa fa-file-export fa-w-18 fa-3x"
									>
										<path
											fill="currentColor"
											d="M384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128zM571 308l-95.7-96.4c-10.1-10.1-27.4-3-27.4 11.3V288h-64v64h64v65.2c0 14.3 17.3 21.4 27.4 11.3L571 332c6.6-6.6 6.6-17.4 0-24zm-379 28v-32c0-8.8 7.2-16 16-16h176V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V352H208c-8.8 0-16-7.2-16-16z"
										/>
									</svg>
								</button>
							</td>
						</tr>
						<tr>
							<td>180410107088</td>
							<td>2020-21</td>
							<td>Akshar Big Brain</td>
							<td>7</td>
							<td>E123456</td>
							<td>Regular</td>
							<td>JAN</td>
							<td>2021</td>
							<td>
								<button type="button" aria-describedby="tooltip" id="view">
									<svg
										aria-hidden="true"
										data-prefix="fas"
										data-icon="eye"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										class="svg-inline--fa fa-eye fa-w-18 fa-3x"
									>
										<path
											fill="currentColor"
											d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 000 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 000-29.19zM288 400a144 144 0 11144-144 143.93 143.93 0 01-144 144zm0-240a95.31 95.31 0 00-25.31 3.79 47.85 47.85 0 01-66.9 66.9A95.78 95.78 0 10288 160z"
										/>
									</svg>
								</button>
								<button type="button" aria-describedby="tooltip" id="generate">
									<svg
										aria-hidden="true"
										data-prefix="fas"
										data-icon="file-export"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
										class="svg-inline--fa fa-file-export fa-w-18 fa-3x"
									>
										<path
											fill="currentColor"
											d="M384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128zM571 308l-95.7-96.4c-10.1-10.1-27.4-3-27.4 11.3V288h-64v64h64v65.2c0 14.3 17.3 21.4 27.4 11.3L571 332c6.6-6.6 6.6-17.4 0-24zm-379 28v-32c0-8.8 7.2-16 16-16h176V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V352H208c-8.8 0-16-7.2-16-16z"
										/>
									</svg>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</PrivateRoute>
	);
}
