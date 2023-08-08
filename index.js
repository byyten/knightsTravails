
node = (data = null, dist = null, prev = null) => {
    if (data == -1) return -1
    dist += 1
    next = []
    return { data, dist, prev, next }
}

add = (p, m) => {
    // p == node.data  // m = [x, y]
    pm0 = p[0] + m[0]
    pm1 = p[1] + m[1]
    if (pm0 < 0 || pm0 > 7 || pm1 < 0 || pm1 > 7) {
        return
    }
    return [pm0, pm1]
}

perms = (p) => {
    return [
        add(p.data, [1,2]),
        add(p.data, [-1,2]),
        add(p.data, [1,-2]),
        add(p.data, [-1,-2]),
        add(p.data, [2,1]),
        add(p.data, [2,-1]),
        add(p.data, [-2,1]),
        add(p.data, [-2,-1])
    ].filter(_p => _p !== undefined)
}

board = visited = { 
    a1: {}, b1: {}, c1: {}, d1: {}, e1: {}, f1: {}, g1: {}, h1: {},
    a2: {}, b2: {}, c2: {}, d2: {}, e2: {}, f2: {}, g2: {}, h2: {},
    a3: {}, b3: {}, c3: {}, d3: {}, e3: {}, f3: {}, g3: {}, h3: {},
    a4: {}, b4: {}, c4: {}, d4: {}, e4: {}, f4: {}, g4: {}, h4: {},
    a5: {}, b5: {}, c5: {}, d5: {}, e5: {}, f5: {}, g5: {}, h5: {},
    a6: {}, b6: {}, c6: {}, d6: {}, e6: {}, f6: {}, g6: {}, h6: {},
    a7: {}, b7: {}, c7: {}, d7: {}, e7: {}, f7: {}, g7: {}, h7: {},
    a8: {}, b8: {}, c8: {}, d8: {}, e8: {}, f8: {}, g8: {}, h8: {}
}

nodes = {}




cols = 'abcdefgh'
rows = [1,2,3,4,5,6,7,8]
rc = (coord) => {
    return cols[coord[0]] + rows[coord[1]]
}
rc_coord = (rc_ref) => {
    c = cols.indexOf(rc_ref[0])
    r = Number(rc_ref[1]) - 1
    return [c, r]
}

markVisited = (_grid) => {
    rcref = rc(_grid.data)
    if (!nodes[rcref]) nodes[rcref] = _grid
    if (!visited[rcref]) visited[rcref] = rcref
}
// checks: rc_coord('c5')
// checks: rccoord = rc_coord(rcref) 

// start point
start = knight = [6,0]
// end point
target = [3,4]

_grid = node(knight, -1)

recurse = 5

// all possible moves from this grid/coord
_nextMoves = perms(_grid)
_nextMoves.forEach(move => { // move = [x,y]
    _move = node(move, _grid.dist, rc(_grid.data))
    if (move[0] !== _grid.data[0] && move[1] !== _grid.data[1]) {
        // avoid direct return to prev
        if (!visited[rc(_move.data)]) { _grid.next.push(_move) } //.data)
        markVisited(_move)
    }
})

_grid

// all good to here
_grid.next.forEach(_grid => {
    _nextMoves = perms(_grid)
    _nextMoves.forEach(move => { // move = [x,y]
        _move = node(move, _grid.dist, rc(_grid.data))
        if (move[0] !== _grid.data[0] && move[1] !== _grid.data[1]) {
            // avoid direct return to prev
            markVisited(_move)
            _grid.next.push(_move) //.data)
        }
    })
})


nodes
visited

_grid = _grid.next[1].next[0]

_nextMoves.forEach(move => { // move = [x,y]
    _move = node(move, _grid.dist, rc(_grid.data))
    if (move[0] !== _grid.data[0] && move[1] !== _grid.data[1]) {
        // avoid direct return to prev
        _grid.next.push(_move.data)
    }
})








_grid.next.forEach(_coord => {
    // grid = node(_coord, _grid.dist, rc(_grid.data))
    let grid = node(_coord, _grid.dist, rc(_grid.data))
    _nextMoves = perms(grid)
    _nextMoves.forEach(move => {
        // move = [x,y]
        _move = node(move, grid.dist, rc(grid.data))
        console.log(_move)
        _last = (rc_coord(_move.prev))
        if (_move[0] !== _last[0] && _move[1] !== _last[1]) {
            // avoid direct return to prev
            grid.next.push(_move.data)
        }
    })
}) 

_grid



/*



// all possible moves from previous coords
_nextMoves = perms(grid)

_nextMoves.forEach(move => {
    // move = [x,y]
    _move = node(move, grid.dist, grid.data)
    if (move[0] !== grid.data[0] && move[1] !== grid.data[1]) {
        // avoid direct return to prev
        grid.next.push(rcref(_move))
    }
})

grid.next.forEach(_grid => {
    _nextMoves = perms(_grid)
    _nextMoves.forEach(move => {
        // move = [x,y]
        _move = node(move, grid.dist, grid.data)
        if (move[0] !== _grid.data[0] && move[1] !== _grid.data[1]) {
            // avoid direct return to prev
            _grid.next.push(_move)
        }
    })
})




grid.next[1].next[1]




_last = src

visited = [noret]

nx1 = node(_next[1], _last.dist, _last.data)
_next = perms(nx1)

_next.forEach(_nx1 => {
    // find all possible moves from new position w/o regressing
    _next1 = perms(nx1)

    if (nx1 == noret)
    
    
    
    if (board[nx[0]][nx[1]] == -1) {
        board[nx[0]][nx[1]] = 1
    }
})



markMoves(_next)

_next.forEach(nx )


p0.next = _next
p0


    console.log([pm0, pm1])
    console.log(bd[pm0][pm1])
    if (bd[pm0][pm1] == -1 ) {
        bd[pm0][pm1] = 1
        console.log(bd[pm0][pm1])
        
        return [pm0, pm1]
    } else {
        return
    }

filter out returning to self 




Treat all possible moves the knight could make as children in a tree

moveTo = (posn, xy) => {
    px = posn[0] + xy[0]
    py = posn[1] + xy[1]
    if (px >= 0 && px <= 7 && py >= 0 && py <= 7) { 
        // legal move
        return [px, py] 
    } else { // illegal move
        return -1
    }
} 

node = (data = null, dist , next = null) => {
    if (data == -1) return -1
    dist += 1
    return { data, dist, next }
}


p = node([3,4], -1)
p1 = node([4,6], p.dist) 
p.next = p1
p2 = node([2,5], p1.dist)
p1.next = p2

p


node(moveTo([3,4], [-1,-2]))

node(moveTo([0,0], [-1,-2]))
node(moveTo([7,0], [-1,-2]))

    ind moves  [+/-1, +/-2] [+/-2, +/-1]
    resultant move [[0 > x < 7], [0 > y < 7]]
    current = [x, y]
  
    knightMoves([xs, ys], [xe, ye])

        start = [xs, ys] 
        end = [xe, ye]

        dx = xe - xs
        dy = ye - ys


start = [0,0]
end = [5,5]

dx = 5
dy = 7

min_mx = Math.ceil(dx / 2)
min_my = Math.ceil(dy / 2)
start = [0,0]
m1 = [2,1]
m2 = [4,2]
m3 = [6,3]
m4 = [5,7]




dist is an array that contains the current distances from the source to other vertices, 
i.e. dist[u] is the current distance from the source to the vertex u. 
The prev array contains pointers to previous-hop nodes on the shortest path 
from source to the given vertex (equivalently, it is the next-hop on the path 
    from the given vertex to the source). 

The code u ← vertex in Q with min dist[u], searches for the vertex u in the 
vertex set Q that has the least dist[u] value. 

Graph.Edges(u, v) returns the length of the edge joining (i.e. the distance between) 
the two neighbor-nodes u and v. The variable alt on line 14 is the 
length of the path from the root node to the neighbor node v 
if it were to go through u. If this path is shorter than the current shortest path recorded 
for v, that current path is replaced with this alt path.


dist = []  // dist[u] is the current distance from the source to the vertex u
prev = []  // array pointers to previous-hop nodes on the shortest path to the vertex u
Q = [] // a queue
v is a vertex

  function Dijkstra(Graph, source):

      for each vertex v in Graph.Vertices:
          dist[v] = INFINITY
          prev[v] = undefined
          add v to Q
      dist[source] = 0

      while Q is not empty:
          u = vertex in Q with min dist[u]
          remove u from Q
          
          for each next v of u in Q:
              alt = dist[u] + Graph.Edges(u, v)
              if alt < dist[v]:
                  dist[v] = alt
                  prev[v] = u

      return dist[], prev[]





board = [
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1]
]


*/