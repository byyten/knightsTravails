
let start
let start_rc
let target 
let target_rc
let recurse = 3
let _grid
let visited
// let path
// let dist
let cols = 'abcdefgh'
let rows = [1, 2, 3, 4, 5, 6, 7, 8]
let nodes = {}


node = (data = null, dist = null, prev = null) => {
    if (data == -1) return -1
    dist += 1
    next = []
    path = []
    return { data, dist, prev, next, path }
}

perms = (p) => {
    add = (p, m) => {
        // p == node.data  // m = [x, y]
        pm0 = p[0] + m[0]
        pm1 = p[1] + m[1]
        if (pm0 < 0 || pm0 > 7 || pm1 < 0 || pm1 > 7) {
            return
        }
        return [pm0, pm1]
    }
    return [
        add(p.data, [1, 2]),
        add(p.data, [-1, 2]),
        add(p.data, [1, -2]),
        add(p.data, [-1, -2]),
        add(p.data, [2, 1]),
        add(p.data, [2, -1]),
        add(p.data, [-2, 1]),
        add(p.data, [-2, -1])
    ].filter(_p => _p !== undefined)
}

rc = (coord) => {
    return cols[coord[0]] + rows[coord[1]]
}

rc_coord = (rc_ref) => {
    c = cols.indexOf(rc_ref[0])
    r = Number(rc_ref[1]) - 1
    return [c, r]
}

// nodesVisited = () => [ Object.keys(nodes).length, Object.keys(nodes).includes(target_rc) ]

// reachedTarget = (nodes, ref) => Object.keys(nodes).includes(ref)

// gamestatus = () => {
//     v = nodesVisited(nodes)
//     t = reachedTarget(nodes, target_rc)
//     if (t) console.log(['visited ', v, '  arrived ', t].join('')) 
// }

gridMoves = (_grid) => {
    _nextMoves = perms(_grid)
    _nextMoves.forEach(move => { // move = [x,y]
        _move = node(move, _grid.dist, rc(_grid.data))
        _move.path = [ ..._grid.path, rc(move)]
        move_rc = rc(_move.data) // markVisited(_move)
        // console.log('recurse ' + move_rc)
        if (move[0] !== _grid.data[0] && move[1] !== _grid.data[1] ) { // and avoid revisiting a previous grid && nodes[rc(_move.data)] == undefined
            // avoid direct return to prev             
            _grid.next.push(_move)
        }
        if ( _move.path.length < 6 && move_rc !== target_rc) { // !reachedTarget(nodes, target_rc)) { //
            // gamestatus()
            gridMoves(_move)
        } else if (move_rc == target_rc) { //(reachedTarget(nodes, target_rc)) {
            // console.log('target ', _move.path)
            paths.push(_move.path)            
        }
    })
    return _grid
}


                // gridMoves = (_grid) => {
                //     _nextMoves = perms(_grid)
                //     _nextMoves.forEach(move => { // move = [x,y]
                //         _move = node(move, _grid.dist, rc(_grid.data))
                //         _move.path = [ ..._grid.path, rc(move)]

                //         if (move[0] !== _grid.data[0] && move[1] !== _grid.data[1] ) { // and avoid revisiting a previous grid && nodes[rc(_move.data)] == undefined
                //             // avoid direct return to prev 
                //             move_rc = markVisited(_move)
                //             _grid.next.push(_move)
                //         }
                //         if ( _grid.path.length < 12  && !reachedTarget(nodes, target_rc)) { // _grid.dist < recurse
                //             // if (move[0] !== _grid.data[0] && move[1] !== _grid.data[1] ) { // and avoid revisiting a previous grid && nodes[rc(_move.data)] == undefined
                //             //     // avoid direct return to prev 
                //             //     move_rc = markVisited(_move)
                //             //     _grid.next.push(_move)    
                //             // }
                //             gridMoves(_move)
                //         } else {
                //             move_rc = markVisited(_move)
                //             if (move_rc === target_rc) {
                //                 console.log('target ', _move.path)
                //             }
                //         }
                //     })
                //     return _grid
                // }


markVisited = (_move) => {
    rcref = rc(_move.data)
    if (nodes[rcref] == undefined) { nodes[rcref] = _move }
    if (visited[rcref] !== rcref) { visited[rcref] = rcref }
    return rcref
}

nextMoves = (__grid) => {
    next_moves = perms(__grid);
    next_moves.forEach(next => { // next = [x,y]
        _move = node(next, __grid.dist, rc(__grid.data))
        _move.path = [ ...__grid.path, rc(next)]
        
        // avoid direct return to prev
        if (next[0] !== __grid.data[0] && next[1] !== __grid.data[1]) {
            rcref = rc(_move.data)
            // if not already visited add to next possible moves
            if (visited[rcref] !== rcref) { 
                __grid.next.push(_move) 
            } // and mark as visited
            move_rc = markVisited(_move)
            if (move_rc === target_rc) {
                console.log('target ', _move.path)
            }
        } 
        if (reachedTarget(nodes, target_rc)) {
            markVisited(_move)
            if (move_rc === target_rc) {
                console.log('target ', _move.path)
            }
        }
    })
    return __grid
}

__nextMoves = (__grid) => {
    _nextMoves = perms(__grid);
    _nextMoves.forEach(next => { // next = [x,y]
        _move = node(next, __grid.dist, rc(__grid.data))
        _move.path = [ ..._grid.path, rc(next)]
        
        // avoid direct return to prev
        if (next[0] !== __grid.data[0] && next[1] !== __grid.data[1]) {
            move_rc = rc(_move.data)
            // if not already visited add to next possible moves
            if (visited[move_rc] !== move_rc) { 
                __grid.next.push(_move) 
            } // and mark as visited
            move_rc = markVisited(_move)
            if (move_rc === target_rc) {
                console.log('target ', _move.path)
            }
        } 
        if (move_rc === target_rc) {  // reachedTarget(nodes, target_rc)
            markVisited(_move)
            console.log('target ', _move.path)

        } else if (visited[move_rc] !== move_rc) { 
            console.log('recurse ' + move_rc)
            __nextMoves(_move)
        }
    })
    return __grid
}

get_path = (nodes) => {
    path = []
    prev_node = nodes[rc(target)]
    dist = prev_node.dist
    path.push([prev_node.prev, prev_node.data])
    
    while (prev_node.prev !== null && prev_node.prev !== rc(target) ) {
      prev_node = nodes[prev_node.prev]
      path.push([prev_node.prev === null ? 'start': prev_node.prev, prev_node.data])
    }
    return [path, dist]
}

visit = () => { 
    return {
        a1: {}, b1: {}, c1: {}, d1: {}, e1: {}, f1: {}, g1: {}, h1: {},
        a2: {}, b2: {}, c2: {}, d2: {}, e2: {}, f2: {}, g2: {}, h2: {},
        a3: {}, b3: {}, c3: {}, d3: {}, e3: {}, f3: {}, g3: {}, h3: {},
        a4: {}, b4: {}, c4: {}, d4: {}, e4: {}, f4: {}, g4: {}, h4: {},
        a5: {}, b5: {}, c5: {}, d5: {}, e5: {}, f5: {}, g5: {}, h5: {},
        a6: {}, b6: {}, c6: {}, d6: {}, e6: {}, f6: {}, g6: {}, h6: {},
        a7: {}, b7: {}, c7: {}, d7: {}, e7: {}, f7: {}, g7: {}, h7: {},
        a8: {}, b8: {}, c8: {}, d8: {}, e8: {}, f8: {}, g8: {}, h8: {}
    }
}

// findTarget = (start, target) => {
//     visited = visit()
//     nodes = {}
//     // start point
//     start_rc = rc(start)
//     // end point
//     target_rc = rc(target)

//     _grid = node(start, -1)
//     _grid.path.push(rc(start))
//     markVisited(_grid)
//     nodesVisited(nodes)

//     // _grid = _nextMoves(_grid)
//     // _grid = gridMoves(_grid)  
//     _grid = nextMoves(_grid)
//     nodesVisited(nodes)

//     _grids = _grid.next
//     _grids.forEach(_grid => {
//         recu = 1
//         gridMoves(_grid)
//     })
// } 





findTarget = (start, target) => {
    // visited = visit()
    // nodes = {}
    // start point
    paths = []
    start_rc = rc(start)
    // end point
    target_rc = rc(target)
    console.log(['find path from ', start_rc, ' to ', target_rc].join(''))
    _grid = node(start, -1)
    _grid.path.push(rc(start))
 
    moves = perms(_grid)
    moves.forEach(next => {
        _move = node(next, _grid.dist, rc(_grid.data))
        _move.path = [ ..._grid.path, rc(next)]
        _grid.next.push(_move)
    })
    _grid.next.forEach(_grid => {
        gridMoves(_grid)
    })
    return paths.sort((a,b) => a.length - b.length)[0]
}


let paths
// testing

    start = [4,2]
    target = [0,0]
    
    findTarget(start, target)

    reachedTarget(nodes, target_rc)

    [path, dist] = get_path(nodes)
    path.reverse().forEach(p => console.log(p.toString()) )
    console.log('distance ' + dist)

    _grid.next[0].next[0]
// ----------------------------------------

    start = [7,1]
    target = [1,0]
    findTarget(start, target)
    
    
    reachedTarget(nodes, target_rc)

    [path, dist] = get_path(nodes)
    path.reverse().forEach(p => console.log(p.toString()) )
    console.log('distance ' + dist)

// -----------------------------

    start = [5,3]
    target = [5,0]
    findTarget(start, target)
  
  
    reachedTarget(nodes, target_rc)

    [path, dist] = get_path(nodes)
    path.reverse().forEach(p => console.log(p.toString()) )
    console.log('distance ' + dist)

// -----------------------------


    start = [5,7]
    target = [2,0]
    findTarget(start, target)
    reachedTarget(nodes, target_rc)

    [path, dist] = get_path(nodes)
    path.reverse().forEach(p => console.log(p.toString()) )
    console.log('distance ' + dist)

// -----------------------------

// knightMoves([3,3],[4,3])
//   => You made it in 3 moves!  Here's your path:
//     [3,3]
//     [4,5]
//     [2,4]
//     [4,3]

    start = [3,3]
    target = [4,3]
    findTarget(start, target)
    reachedTarget(nodes, target_rc)

    [path, dist] = get_path(nodes)
    path.reverse().forEach(p => console.log(p.toString()) )
    console.log('distance ' + dist)

// -----------------------------



find_target = () => {
    let target_found = -1
    next_level = []
    nexts = _grid.next
    while (target_found === -1) {
        // assemble breadth search content
        nexts.forEach(nx => { 
            nx.next.forEach(n => next_level.push(n) )
        })        // console.log(next_level)
        // check for target hit
        next_level.forEach(nx => {
            if (rc(nx.data) === target_rc ) {     // target hit    
                target_found = true
                dist = nx.dist
                console.log(['target ', nx.data, rc(nx.data),target_rc, nx.dist] )
            } // else {            // console.log(['miss ', nx.data, rc(nx.data)])
            // }
        })
        nexts = next_level
        next_level = []
    }
}

build_paths_depth = () => {} 






path = []
nx = _grid.next[0]
// while (nx.next.length > 0) {
//   path.push(rc(nx.data))
//   nx = n
// }

// _grid.next.forEach(nx => )



_pth = rc(_grid.data)
_pth += ('.' + rc(_grid.next[0].next[0].next[0].next[0].next[0].data))



_grid.next[0]












// start point
// start = knight = [6, 0]
// start_rc = rc(start)
// // end point
// target = [3, 4]
// target_rc = rc(target)

// _grid = node(start, -1)
// markVisited(_grid)
// nodesVisited(nodes)

// // recu = 1
// _grid = nextMoves(_grid)
// nodesVisited(nodes)

// _grids = _grid.next
// _grids.forEach(_grid => {
//     gridMoves(_grid)
// })















// // all good to here
// // _grid.next.forEach(_grid => {

// _grids.forEach(_grid => {
//     gridMoves(_grid)
//     // _nextMoves = perms(_grid)
//     // _nextMoves.forEach(next => { // next = [x,y]
//     //     _move = node(next, _grid.dist, rc(_grid.data))
//     //     if (next[0] !== _grid.data[0] && next[1] !== _grid.data[1]) {
//     //         // avoid direct return to prev
//     //         markVisited(_move)
//     //         _grid.next.push(_move) //.data)
//     //     }
//     // })
// })

// nodesVisited(nodes)


// _grid.next.length

// _grid.next.length
// _grid.next[0].next[0]


/* 

 _grids.forEach(_grid => {
    let recu = 1
    gridMoves(_grid)
})
reachedTarget(nodes, target_rc)
recu

_root.next[0].next[0].next[0]




 _grids = _grid.next[0]

_grids.forEach(_grid => {
    _nextMoves = perms(_grid)
    _nextMoves.forEach(next => { // next = [x,y]
        _move = node(next, _grid.dist, rc(_grid.data))
        if (next[0] !== _grid.data[0] && next[1] !== _grid.data[1]) {
            // avoid direct return to prev
            markVisited(_move)
            _grid.next.push(_move) //.data)
        }
    })
})

nodes
visited



// ---------------------------------
_grid = _grid.next[0].next[0]
_nextMoves = perms(_grid)
_nextMoves.forEach(next => { // next = [x,y]
    _move = node(next, _grid.dist, rc(_grid.data))
    if (next[0] !== _grid.data[0] && next[1] !== _grid.data[1]) {
        // avoid direct return to prev
        markVisited(_move)
        _grid.next.push(_move) //.data)
    }
})

_grid.next[0]






_grid.next.forEach(_coord => {
    // grid = node(_coord, _grid.dist, rc(_grid.data))
    let grid = node(_coord, _grid.dist, rc(_grid.data))
    _nextMoves = perms(grid)
    _nextMoves.forEach(next => {
        // next = [x,y]
        _move = node(next, grid.dist, rc(grid.data))
        console.log(_move)
        _last = (rc_coord(_move.prev))
        if (_move[0] !== _last[0] && _move[1] !== _last[1]) {
            // avoid direct return to prev
            grid.next.push(_move.data)
        }
    })
}) 

_grid

 */

/*



// all possible moves from previous coords
_nextMoves = perms(grid)

_nextMoves.forEach(next => {
    // next = [x,y]
    _move = node(next, grid.dist, grid.data)
    if (next[0] !== grid.data[0] && next[1] !== grid.data[1]) {
        // avoid direct return to prev
        grid.next.push(rcref(_move))
    }
})

grid.next.forEach(_grid => {
    _nextMoves = perms(_grid)
    _nextMoves.forEach(next => {
        // next = [x,y]
        _move = node(next, grid.dist, grid.data)
        if (next[0] !== _grid.data[0] && next[1] !== _grid.data[1]) {
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
        // legal next
        return [px, py] 
    } else { // illegal next
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

The code u  vertex in Q with min dist[u], searches for the vertex u in the 
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