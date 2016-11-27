2D
	! Point
	.A(0,0,)
	.B(0,1,)
	.C(5.6,)
	[point]D()

	! Lines
	-l(A,B)
	[line]m()

	! Nameless line with nameless point
	-(.(2,5,),.(3,4,),)

	! Parallel line
	=(l,C,)
	[parallel](l,C,)

	! Perpendicular line
	+(l,C,)
	[perpendicular](l,C,)

	! Circles
	@(A,5,)
	@e(A,B,)
	[circle]e(A,B,C,)

	! Intersection
	*P(l,m,)
	[intersection]P(l,m,)

	! Polygon
	#M(A,B,C,D,)

3D
	! Point with 3 number
	.A(1,2,2,)

	! Planes
	_S(A,B,C,)
	[plane](l,A,)

	! Circle with a plane, a point as center, and a number
	@(S,A,3,)

	! Circle with a plane, center and a point
	@(S,A,B,)

	! Circle with a plane, center and a point
	=(S,l)

	*(S,l,)

